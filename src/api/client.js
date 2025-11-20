/**
 * API Client Configuration
 * 
 * This is a placeholder for future API integration when the web app is developed.
 * The Bridgit Social backend is proprietary and not included in this repository.
 */

/**
 * API client configuration
 * @type {Object}
 */
const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.bridgitsocial.com',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create an API client instance
 * @returns {Object} API client
 */
export function createAPIClient() {
  return {
    baseURL: apiConfig.baseURL,
    
    /**
     * Make a GET request
     * @param {string} endpoint - API endpoint
     * @param {Object} params - Query parameters
     * @returns {Promise} API response
     */
    async get(endpoint, params = {}) {
      // TODO: Implement when backend is ready
      console.log(`[API] GET ${endpoint}`, params);
      throw new Error('API not yet implemented');
    },
    
    /**
     * Make a POST request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body
     * @returns {Promise} API response
     */
    async post(endpoint, data = {}) {
      // TODO: Implement when backend is ready
      console.log(`[API] POST ${endpoint}`, data);
      throw new Error('API not yet implemented');
    },
    
    /**
     * Make a PUT request
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body
     * @returns {Promise} API response
     */
    async put(endpoint, data = {}) {
      // TODO: Implement when backend is ready
      console.log(`[API] PUT ${endpoint}`, data);
      throw new Error('API not yet implemented');
    },
    
    /**
     * Make a DELETE request
     * @param {string} endpoint - API endpoint
     * @returns {Promise} API response
     */
    async delete(endpoint) {
      // TODO: Implement when backend is ready
      console.log(`[API] DELETE ${endpoint}`);
      throw new Error('API not yet implemented');
    },
  };
}

export default createAPIClient();
