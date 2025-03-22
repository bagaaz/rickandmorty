import axios from "axios";

const requestService = axios.create({
    baseURL: "https://rickandmortyapi.com/api/",
})

export default requestService;