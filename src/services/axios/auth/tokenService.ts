const ACCESS_TOKEN_KEY = 'accessToken';

export type TokenService = {
  get: () => string | null;
  set: (token: string | null) => void;
  clear: () => void;
};

export const tokenService: TokenService = {
  get: () => {
    if (typeof window === 'undefined') return null;

    try {
      const value = window.localStorage.getItem(ACCESS_TOKEN_KEY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`[tokenService] Failed to read "${ACCESS_TOKEN_KEY}" from localStorage`, error);
      return null;
    }
  },

  set: (token) => {
    if (typeof window === 'undefined') return;

    try {
      if (token === null) {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      } else {
        window.localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
      }
    } catch (error) {
      console.error(`[tokenService] Failed to write "${ACCESS_TOKEN_KEY}" to localStorage`, error);
    }
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      } catch (error) {
        console.error(
          `[tokenService] Failed to remove "${ACCESS_TOKEN_KEY}" from localStorage`,
          error
        );
      }
    }
  },
};
