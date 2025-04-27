
export interface User {
  id?: number;
  username: string;
  email: string;
  roles?: string[];
  token?: string;
  emailVerified?: boolean;
  oauthProvider?: string;
  oauthProviderId?: string;
  hasTwoFactorEnabled?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  totpCode?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string; // Used for form validation only
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: User;
  requiresTwoFactor?: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCodeUrl: string;
}

export interface TwoFactorVerifyRequest {
  userId: number | string;
  totpCode: string;
}

export interface OAuthLoginRequest {
  provider: string;
  code: string;
  redirectUri: string;
}

export interface TwoFactorLoginRequest {
  sessionId: string;
  totpCode: string;
}
