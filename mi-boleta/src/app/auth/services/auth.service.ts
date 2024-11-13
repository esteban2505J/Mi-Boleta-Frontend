import apiClient from "../../general/api/axiosConfig";
import { urlEndpoints } from "../../general/env/urls";
import { RegisterClientDTO } from "../dto/RegisterClientDTO";
import { LoginClientDTO } from "../dto/LoginClientDTO";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })

export class AuthService {

    static  userEmail:string='';

    static setUserEmail(email: string) {
        this.userEmail = email;
      }
    
    static  getUserEmail(): string {
        return this.userEmail;
      }

    static async registerClient(data: RegisterClientDTO){
        
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/register-client`, data)
    }

    static async loginClient(data:LoginClientDTO){
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/login-client`, data)
    }

    static async forgotPasword(data:string){
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/forgot-password?emailAddress=${data}`)
    }
    static async sendCodeForgotPass(code:string,emailAddress:string){
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/verify-code-forgot-password?code=${code}&emailAddress=${emailAddress}`)
    }
    static async sendCodeActiveAccount(code:string, idUser:string){
        return await apiClient.post(`${urlEndpoints.authServiceUrl}/activation-code?code=${code}&idUser=${idUser}`)
    }
}
        