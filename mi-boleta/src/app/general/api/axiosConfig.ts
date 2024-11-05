import axios from "axios";

const apiClient = axios.create({
    timeout:10000
})
export default apiClient;