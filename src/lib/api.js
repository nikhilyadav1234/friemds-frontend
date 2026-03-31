// import axios from "axios";

// const API = process.env.REACT_APP_BACKEND_URL + "/api";

// const api = axios.create({
//   baseURL: API,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("friemds_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;









import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL + "/api";

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("friemds_token"); // ✅ CHANGE
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
