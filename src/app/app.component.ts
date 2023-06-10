import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent {
   title = 'Rapid';
   isAuthenticated = false;

   constructor(private authService: AuthService, private router: Router) {
      this.isAuthenticated = this.authService.isLoggedIn();
      if (this.isAuthenticated) {
         router.navigate(['posts']);
      }
   }

   ngOnInit(): void {}
}
