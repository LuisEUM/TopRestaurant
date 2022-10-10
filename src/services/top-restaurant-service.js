import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4001/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.error("unauthenticated, redirect to login");
      localStorage.clear();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function getProfile() {
  return http.get("/profile");
}

export function getRestaurants() {
  return http.get("/restaurants");
}

export function getRestaurant(id) {
  return http.get(`/restaurants/${id}`);
}

export function createRestaurant(restaurant) {
  return http.post("/restaurants", restaurant);
}

export function likeRestaurant(id) {
  return http.post(`/restaurants/${id}/like`);
}

export function commentRestaurant(id, text) {
  return http.post(`/restaurants/${id}/comments`, { text });
}

export function authenticate(data) {
  return http.post("/authenticate", data);
}
