import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterClientDTO } from '../../dto/RegisterClientDTO';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, AvatarModule, NgIf,NgClass, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
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
  
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      idUser: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Ejemplo de validación de 10 dígitos
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
   
  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }


  // Getter para obtener el valor del formulario en el tipo RegisterClientDTO
  get registerData(): RegisterClientDTO {
    return this.registerForm.value as RegisterClientDTO;
  }

   // Método de validación personalizada para verificar que las contraseñas coincidan
   passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      console.log('Datos de registro:', this.registerData);
      const response = await  AuthService.registerClient(this.registerData)
      console.log(response);
      
    } else {
      console.warn('Formulario inválido');
    }
  }

}
