const rawUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

const API_URL = rawUrl.startsWith('http') 
    ? rawUrl 
    : `https://${rawUrl}`;

export default API_URL;