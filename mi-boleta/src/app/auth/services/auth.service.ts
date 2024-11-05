import apiClient from "../../general/api/axiosConfig";
import { urlEndpoints } from "../../general/env/urls";
import { RegisterClientDTO } from "../dto/RegisterClientDTO";

export class AuthService {
    static async registerClient(data: RegisterClientDTO){
        
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/register-client`)
    }
}