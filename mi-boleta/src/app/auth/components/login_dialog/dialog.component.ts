import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterClientDTO } from '../../dto/RegisterClientDTO';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { LoginClientDTO } from '../../dto/LoginClientDTO';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, AvatarModule, NgIf,NgClass, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  // flags of modal view
  isLogin: boolean = true;
  recoverPassword:boolean = false;

  recover(){
    this.recoverPassword = true;
    this.isLogin = false;
  
  }

  toggleView() {
    this.isLogin = !this.isLogin;
    this.recoverPassword = false;
  }

  goToLogin() {
    this.isLogin = true;
    this.recoverPassword = false;
  }

  registerForm: FormGroup;

  loginForm:FormGroup;

  recoverPaswordForm: FormGroup;
  
  constructor(private fb: FormBuilder, ) {
    this.registerForm = this.fb.group({
      idUser: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Ejemplo de validación de 10 dígitos
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.loginForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.recoverPaswordForm =  this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
    })
   
  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }


  // Getter para obtener el valor del formulario en el tipo RegisterClientDTO
  get registerData(): RegisterClientDTO {
    return this.registerForm.value as RegisterClientDTO;
  }

  get loginData(): LoginClientDTO{
    return this.loginForm.value as LoginClientDTO;
  }

   // Método de validación personalizada para verificar que las contraseñas coincidan
   passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Function for the register process
  async onSubmitRegister() {
    if (this.registerForm.valid) {
      try {
        console.log('Datos de registro:', this.registerData);
      const response = await  AuthService.registerClient(this.registerData)
      console.log(response);
        
      } catch (error) {
        console.log(error);
      }
      
    } else {
      console.warn('Formulario inválido');
    }
  }

  // Function for the register process
  async onSubmitLogin(){
    if (this.loginForm.valid){
      try {
        console.log('Datos del login', this.loginData);
        const loginResponse = await AuthService.loginClient(this.loginData)
        console.log(loginResponse);
        
      } catch (error) {
        console.log(error);
        
      }
    }

  }

  async onSubmitForgotPassword(){
    if(this.recoverPaswordForm.valid){
      try {

        const email = this.recoverPaswordForm.value.emailAddress;
        console.log(email);
        const responseForgotPasword = await AuthService.forgotPasword(email)
        console.log(responseForgotPasword);
        
      } catch (error) {
        console.log(error);
        
      }
    }

  }

}
