const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

console.log("API_BASE_URL:", API_BASE_URL);
console.log("SHOPIFY_STORE_URL:", process.env.SHOPIFY_STORE_URL);
console.log("SHOPIFY_ACCESS_TOKEN:",process.env.SHOPIFY_ACCESS_TOKEN);

export const API_ENDPOINTS = {
    CUSTOMERS: `${API_BASE_URL}/customers`,
};
