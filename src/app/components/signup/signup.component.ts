import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
   signupForm: FormGroup;

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {
      this.signupForm = this.createFormGroup();
   }

   createFormGroup(): FormGroup {
      return new FormGroup({
         name: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
         ]),
         email: new FormControl('', [Validators.required, Validators.email]),
         password: new FormControl('', [
            Validators.required,
            Validators.minLength(7),
         ]),
         phone: new FormControl('', [Validators.required]),
      });
   }

   signup(): void {
      this.authService.signup(this.signupForm.value).subscribe((res) => {
         this.router.navigate(['/user']);
      });
   }
}
