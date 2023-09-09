import axios from "axios";

export const baseUrl = axios.create({
  baseURL:`https://api.themoviedb.org/3`
})