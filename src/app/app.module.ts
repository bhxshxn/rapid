import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { MatSelectModule } from '@angular/material/select';
import { CategoryComponent } from './components/category/category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UserComponent } from './components/user/user.component';
import { ExampleComponent } from './components/example/example.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ReportComponent } from './components/report/report.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { CardComponent } from './components/card/card.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { AdveatiserComponent } from './components/adveatiser/adveatiser.component';
import { CreateAdveatiserComponent } from './components/adveatiser/create-adveatiser/create-adveatiser.component';
import { EditAdveatiserComponent } from './components/adveatiser/edit-adveatiser/edit-adveatiser.component';
import { ViewAdveatiserComponent } from './components/adveatiser/view-adveatiser/view-adveatiser.component';
import { CreateRechargeComponent } from './components/recharge/create-recharge/create-recharge.component';
import { ViewComponent } from './components/advertisement/view/view.component';
import { UpdateAdvertisementComponent } from './components/advertisement/update-advertisement/update-advertisement.component';
import { CreateAdvertisementComponent } from './components/advertisement/create-advertisement/create-advertisement.component';

@NgModule({
   declarations: [
      AppComponent,
      NavigationComponent,
      SignupComponent,
      LoginComponent,
      HomeComponent,
      PostsComponent,
      CreatePostComponent,
      NavBarComponent,
      CategoryComponent,
      CreateCategoryComponent,
      PostDetailComponent,
      UserComponent,
      ExampleComponent,
      PrivacyComponent,
      ReportComponent,
      CardComponent,
      RechargeComponent,
      AdvertisementComponent,
      AdveatiserComponent,
      CreateAdveatiserComponent,
      EditAdveatiserComponent,
      ViewAdveatiserComponent,
      CreateRechargeComponent,
      ViewComponent,
      UpdateAdvertisementComponent,
      CreateAdvertisementComponent,
   ],
   imports: [
      MatSnackBarModule,
      BrowserModule,
      AppRoutingModule,
      NoopAnimationsModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatToolbarModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatSidenavModule,
      MatSelectModule,
      MatFormFieldModule,
      MatProgressBarModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      BrowserAnimationsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      NgChartsModule,

      MatGridListModule,

      MatTabsModule,
      MatButtonToggleModule,
      MatDialogModule,
   ],
   providers: [
      AuthService,
      AuthGuard,
      [
         {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
         },
         { provide: LocationStrategy, useClass: HashLocationStrategy },
      ],
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
