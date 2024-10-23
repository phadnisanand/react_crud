import axios from "axios";

const api = axios.create({
  baseURL: "https://crud-node-ekm4.onrender.com",
});

// get method
export const getPost = () => {
  return api.get("/todos");
};

// delete method
export const deletePost = (id) => {
  return api.delete(`/todos/${id}`);
};

//post method
export const postData = (post) => {
  return api.post("/todos", post);
};

//put method
export const updateData = (id, post) => {
  return api.put(`/todos/${id}`, post);
};
