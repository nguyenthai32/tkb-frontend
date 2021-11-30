import axios from "axios";


export default axios.create({
    baseURL: "http://localhost:3939/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});