import axios from "axios";

//Conexão com o backend:
const api = axios.create({
    baseURL: "http://localhost:3000"
})

export default api;