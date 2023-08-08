import axios from "axios";

let client;

function getClient() {
  if (!client) {
    client = axios.create({
      baseURL: "http://localhost:8000/api",
      timeout: 4000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }
  return client;
}

export default getClient;
