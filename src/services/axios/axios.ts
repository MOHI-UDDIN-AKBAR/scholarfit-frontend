import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { refreshAccessToken } from '../api/auth';
import { tokenService, type TokenService } from './auth/tokenService';

type FailedRequest = {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
  config: InternalAxiosRequestConfig;
};

interface ApiClientConfig {
  baseURL: string;
  withCredentials?: boolean;
  timeout?: number;
  enableRequestInterceptors?: boolean;
  enableResponseInterceptors?: boolean;
}

const DEFAULT_CONFIG: ApiClientConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1/',
  withCredentials: true,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
  enableRequestInterceptors: true,
  enableResponseInterceptors: true,
};

class ApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedRequest[] = [];
  private tokenManager: TokenService;
  private config: ApiClientConfig;

  constructor(config: Partial<ApiClientConfig> = {}, tokenManager: TokenService) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.tokenManager = tokenManager;

    this.instance = axios.create({
      baseURL: this.config.baseURL,
      withCredentials: this.config.withCredentials,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (this.config.enableRequestInterceptors) {
      this.setupRequestInterceptors();
    }

    if (this.config.enableResponseInterceptors) {
      this.setupResponseInterceptors();
    }
  }

  private setupRequestInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.tokenManager.get();

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        (config as any).metadata = {
          startTime: Date.now(),
          url: config.url,
        };

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private setupResponseInterceptors(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const config = response.config as InternalAxiosRequestConfig & { metadata?: any };
        if (config?.metadata?.startTime) {
          const duration = Date.now() - config.metadata.startTime;
          console.debug(`API Request ${config.metadata.url} took ${duration}ms`);
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (!error.response) {
          console.error('Network error:', error.message);
          return Promise.reject(this.normalizeError(error));
        }

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          if (originalRequest.url?.includes('/auth/refresh')) {
            this.tokenManager.clear();
            return Promise.reject(this.normalizeError(error));
          }

          return this.handleUnauthorizedError(originalRequest, error);
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private async handleUnauthorizedError(
    originalRequest: InternalAxiosRequestConfig & { _retry?: boolean },
    error: AxiosError
  ): Promise<unknown> {
    if (this.isRefreshing) {
      return this.addToQueue(originalRequest);
    }

    originalRequest._retry = true;
    this.isRefreshing = true;

    try {
      const { accessToken } = await refreshAccessToken();

      this.tokenManager.set(accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      this.retryFailedRequests(accessToken);

      return this.instance(originalRequest);
    } catch (refreshError) {
      this.tokenManager.clear();

      // Reject all queued requests
      this.failedQueue.forEach(({ reject }) => reject(refreshError));
      this.failedQueue = [];

      return Promise.reject(this.normalizeError(refreshError));
    } finally {
      this.isRefreshing = false;
    }
  }

  private addToQueue(originalRequest: InternalAxiosRequestConfig): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.failedQueue.push({
        resolve,
        reject,
        config: originalRequest,
      });
    });
  }

  private retryFailedRequests(token: string): void {
    this.failedQueue.forEach(({ resolve, reject, config }) => {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      this.instance(config).then(resolve).catch(reject);
    });

    this.failedQueue = [];
  }

  private normalizeError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return new Error(
        axiosError.response?.data?.message || axiosError.message || 'An unexpected error occurred'
      );
    }

    return error instanceof Error ? error : new Error('An unexpected error occurred');
  }

  public get axiosInstance(): AxiosInstance {
    return this.instance;
  }

  public updateTokenManager(tokenManager: TokenService): void {
    this.tokenManager = tokenManager;
  }

  public updateConfig(config: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...config };
    this.instance.defaults.baseURL = this.config.baseURL;
    this.instance.defaults.timeout = this.config.timeout;
    this.instance.defaults.withCredentials = this.config.withCredentials;
  }

  public clear(): void {
    this.isRefreshing = false;
    this.failedQueue = [];
  }
}

export const api = new ApiClient({}, tokenService).axiosInstance;
