import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'; // Make sure AuthService is correctly imported
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router,    private toastr: ToastrService) { }

  ngOnInit(): void { }
 
  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.login(loginForm.value.email, loginForm.value.password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/listProduct']);
          this.toastr.success('Connexion réussie', 'Succès'); // affiche une toast de succès
        },
        error: (err) => {
          console.error('Login failed', err);
          this.toastr.error('Échec de la connexion', 'Erreur'); // affiche une toast d'erreur
        }
      });
    }
  }
  

  signup(signupForm: NgForm) {
    if (signupForm.valid) {
      this.authService.signup(signupForm.value.username, signupForm.value.email, signupForm.value.password).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          // Handle response, such as redirecting to a login page or directly logging in the user
        },
        error: (err) => {
          console.error('Signup failed', err);
        }
      });
    }
  }
}
