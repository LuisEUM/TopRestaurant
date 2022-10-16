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
    if (error?.response?.status === 401 || window.location.pathname !== "/login") {
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

export function logout() {
  return http.delete("/logout");
}

export function updateProfile(data) {
  data.image = data.image[0]
  const newData = new FormData()

  Object.keys(newData).forEach(key => {
    newData.append(key, data[key])
  })

  
  return http.patch("/update", data);
}



export function getRestaurants() {
  return http.get("/restaurants");
}

export function getRestaurant(id) {
  return http.get(`/restaurants/${id}`);
}

export function getZones(id) {
  return http.get(`/zones/${id}`);
}


export function createRestaurant(restaurant) {
  return http.post("/restaurants", restaurant);
}


export function followRestaurant(id) {
  return http.post(`/follow/${id}`);
}

export function getFollow(id) {
  return http.get(`/follow/${id}`);
}


export function commentRestaurant(id, text) {
  return http.post(`/restaurants/${id}/comments`, { text });
}

export function authenticate(data) {
  return http.post("/authenticate", data);
}


export function postRegister(data) {
  return http.post("/register", data);
}
