import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   selector: 'app-nav-bar',
   templateUrl: './nav-bar.component.html',
   styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
   public opened = false;
   public loggedIn = false;

   constructor(private authService: AuthService, private router: Router) {}

   ngOnInit(): void {
      this.loggedIn = this.authService.isUserLoggedIn$.value;
   }

   onToolbarMenuToggle() {
      if (this.opened) {
         this.opened = false;
      } else {
         this.opened = true;
      }
   }

   logoutUser() {
      this.authService.logout();
      this.router.navigate(['/login']);
   }
}
