export type ErrorCode =
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR'
  | 'THIRD_PARTY_ERROR'
  | 'UNKNOWN_ERROR'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'USER_EXISTS'
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_DISABLED'
  | 'INVALID_REFRESH_TOKEN'
  | 'REFRESH_TOKEN_EXPIRED'
  | 'USER_NOT_FOUND'
  | 'WEAK_PASSWORD'
  | 'ACCOUNT_LOCKED'
  | 'INVALID_EMAIL'
  | 'INVALID_NAME'
  | 'PASSWORD_MISMATCH';

export type PaginationMeta = {
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor: string;
  previousCursor?: string;
};

export interface ApiMeta {
  timestamp: string;
  requestId?: string;
  pagination?: PaginationMeta;
}

export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: unknown;
  timestamp?: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: ApiMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiError;
  meta?: ApiMeta;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
