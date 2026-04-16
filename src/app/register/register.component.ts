import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { RegisterRequest } from '../../model/register-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService
  ) { }

  registerForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.min(4)] }),
    password2: new FormControl<string>('', [Validators.required, Validators.min(4)])
  });

  registerUser() {

    const registerObj = this.registerForm.getRawValue();

    if (this.registerForm.invalid || (registerObj.password != registerObj.password2)) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request: RegisterRequest = {
      username: registerObj.username,
      email: registerObj.email,
      password: registerObj.password
    };

    this.authService.register(request).subscribe((res: any) => {
      alert('User with id: ' + res.id + ' added!')
      console.log('Success!');
    }, (err: any) => {
      console.error('Register user error!');
    })

  }
}
