import { apiFetch as mockFetch } from './mockApi';

const IS_DEMO = true; // In the demo repo, this is always true
const REAL_API = 'http://localhost:8000';

export const callApi = (path, options = {}) => {
  if (IS_DEMO) {
    return mockFetch(path, options);
  }
  return fetch(path.startsWith('http') ? path : `${REAL_API}${path}`, options);
};
