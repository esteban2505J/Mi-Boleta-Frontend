import apiClient from "../../general/api/axiosConfig";
import { urlEndpoints } from "../../general/env/urls";
import { RegisterClientDTO } from "../dto/RegisterClientDTO";
import { LoginClientDTO } from "../dto/LoginClientDTO";

export class AuthService {
    static async registerClient(data: RegisterClientDTO){
        
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/register-client`, data)
    }

    static async loginClient(data:LoginClientDTO){
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/login-client`, data)
    }

    static async forgotPasword(data:string){
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/forgot-password?emailAddress=${data}`)
    }
}
        