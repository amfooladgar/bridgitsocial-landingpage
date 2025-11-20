/**
 * API Endpoints
 * 
 * Central definition of all API endpoints for the Bridgit Social web app.
 * These are placeholders for future backend integration.
 */

const API_VERSION = 'v1';

/**
 * Authentication endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: `/${API_VERSION}/auth/login`,
  SIGNUP: `/${API_VERSION}/auth/signup`,
  LOGOUT: `/${API_VERSION}/auth/logout`,
  REFRESH: `/${API_VERSION}/auth/refresh`,
  VERIFY_EMAIL: `/${API_VERSION}/auth/verify-email`,
  FORGOT_PASSWORD: `/${API_VERSION}/auth/forgot-password`,
  RESET_PASSWORD: `/${API_VERSION}/auth/reset-password`,
};

/**
 * User endpoints
 */
export const USER_ENDPOINTS = {
  PROFILE: `/${API_VERSION}/users/me`,
  UPDATE_PROFILE: `/${API_VERSION}/users/me`,
  UPLOAD_AVATAR: `/${API_VERSION}/users/me/avatar`,
  SETTINGS: `/${API_VERSION}/users/me/settings`,
  DELETE_ACCOUNT: `/${API_VERSION}/users/me`,
};

/**
 * Discovery endpoints (future)
 */
export const DISCOVERY_ENDPOINTS = {
  NEARBY: `/${API_VERSION}/discovery/nearby`,
  MATCHES: `/${API_VERSION}/discovery/matches`,
  MARK_TO_MEET: `/${API_VERSION}/discovery/mark-to-meet`,
};

/**
 * Connection endpoints (future)
 */
export const CONNECTION_ENDPOINTS = {
  LIST: `/${API_VERSION}/connections`,
  GET: (id) => `/${API_VERSION}/connections/${id}`,
  ACCEPT: (id) => `/${API_VERSION}/connections/${id}/accept`,
  DECLINE: (id) => `/${API_VERSION}/connections/${id}/decline`,
  ARCHIVE: (id) => `/${API_VERSION}/connections/${id}/archive`,
  NOTES: (id) => `/${API_VERSION}/connections/${id}/notes`,
};

/**
 * Messaging endpoints (future)
 */
export const MESSAGE_ENDPOINTS = {
  LIST: `/${API_VERSION}/messages`,
  SEND: `/${API_VERSION}/messages`,
  GET: (id) => `/${API_VERSION}/messages/${id}`,
  DELETE: (id) => `/${API_VERSION}/messages/${id}`,
};

export default {
  AUTH_ENDPOINTS,
  USER_ENDPOINTS,
  DISCOVERY_ENDPOINTS,
  CONNECTION_ENDPOINTS,
  MESSAGE_ENDPOINTS,
};
