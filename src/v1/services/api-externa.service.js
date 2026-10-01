import axios from "axios";

const urlExternaBase = "https://openlibrary.org";

const apiExternas = axios.create({
    baseURL: urlExternaBase,
    headers: {
        "Content-Type": "application/json"
    }
});

export const buscarLibrosExternosService = async (titulo) => {
    const response = await apiExternas.get("/search.json", {
        params: {
            q: titulo,
            lang: "es",
            limit: 5
        }
    });

    return response.data;
};