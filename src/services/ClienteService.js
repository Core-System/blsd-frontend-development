import axios from "axios";

const API_URL = "http://localhost:8080/cliente";

export const listarClientes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const cadastrarCliente = async (cliente) => {
  const response = await axios.post("/cliente", cliente);
  return response.data;
};
