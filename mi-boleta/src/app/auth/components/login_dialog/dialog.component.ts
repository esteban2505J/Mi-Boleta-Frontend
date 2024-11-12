import { Component ,ElementRef, ViewChild ,ViewChildren, QueryList} from '@angular/core';
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

  @ViewChildren('code0, code1, code2, code3,code4,code5') codeInputs!: QueryList<ElementRef>;

  // flags of modal view
  isLogin: boolean = true;
  recoverPassword:boolean = false;
  inputCodeRecover:boolean=false;

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

  sendCodeRecoverForm:FormGroup;
  
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

    this.sendCodeRecoverForm = fb.group({
      code:['',[Validators.required,  Validators.pattern(/^\d{4}[A-Z]{2}$/)]]
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

  // Function for  submit the code of recover
  async onSubmitForgotPassword(){
    if(this.recoverPaswordForm.valid){
      try {

        const email = this.recoverPaswordForm.value.emailAddress;
        console.log(email);
        const responseForgotPasword = await AuthService.forgotPasword(email)
        if(responseForgotPasword.data.data === 'SUCCESS') {
          AuthService.setUserEmail(email)
          this.inputCodeRecover = true;
        }
        console.log(responseForgotPasword);
        
      } catch (error) {
        console.log(error);
        
      }
    }

  }

  // Function to handle recovery code character entry
  handleInput(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1 && index < this.codeInputs.length - 1) {
      // Mover el foco al siguiente input
      this.codeInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  // function to handle the keystroke event on input
  handleKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'ArrowLeft' && index > 0) {
      // Mover foco al input anterior
      this.codeInputs.toArray()[index - 1].nativeElement.focus();
    } else if (event.key === 'ArrowRight' && index < this.codeInputs.length - 1) {
      // Mover foco al siguiente input
      this.codeInputs.toArray()[index + 1].nativeElement.focus();
    } else if (event.key === 'Backspace' && input.value === '' && index > 0) {
      // Mover foco al input anterior si está vacío
      this.codeInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  // function to handle the code pasting event
  handlePaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text') || '';
    const values = clipboardData.split('');

    // Rellenar los inputs con el valor pegado
    this.codeInputs.forEach((input, index) => {
      input.nativeElement.value = values[index] || '';
    });

    // Prevenir el comportamiento por defecto del pegado
    event.preventDefault();
  }

  // function to get code of the input 
  getCode():string {
    return this.codeInputs.toArray().map(input => input.nativeElement.value).join('');
  }

  // function for managing the sending of the password recovery code 
  async onSubmitCodeRecover(){

    try {
      
        try {
          const responseSendCodeRe= await AuthService.sendCodeForgotPass(this.getCode(), AuthService.getUserEmail())
          console.log(responseSendCodeRe);
          console.log('hello');
        } catch (error) {
          console.log(error);
          
        }
      
      
    } catch (error) {
      
    }

  }

}
