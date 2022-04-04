import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDMwYmZhYWUzOGJmMDhmMGMxMzZhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTA3NjI4MiwiZXhwIjoxNjQ5MzM1NDgyfQ.9AR4nUNLbgS-fOqhQ4J82JSgKmOr714hrTVsB0y1Te8"


export const publicRequest = axios.create({
    baseURL:BASE_URL
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
})