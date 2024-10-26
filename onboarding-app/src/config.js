export const API_URL =
  import.meta.env.VITE_ENV === 'production'
    ? import.meta.env.VITE_PROD_BASE_URL
    : 'http://localhost:3000/';
