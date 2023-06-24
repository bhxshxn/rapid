import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CategoryComponent } from './components/category/category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UserComponent } from './components/user/user.component';
import { AppComponent } from './app.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ReportComponent } from './components/report/report.component';
import { AdveatiserComponent } from './components/adveatiser/adveatiser.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { CreateRechargeComponent } from './components/recharge/create-recharge/create-recharge.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { CreateAdveatiserComponent } from './components/adveatiser/create-adveatiser/create-adveatiser.component';
import { EditAdveatiserComponent } from './components/adveatiser/edit-adveatiser/edit-adveatiser.component';
import { ViewAdveatiserComponent } from './components/adveatiser/view-adveatiser/view-adveatiser.component';
import { CreateAdvertisementComponent } from './components/advertisement/create-advertisement/create-advertisement.component';
import { General_settingsComponent } from './components/general-settings/general_settings.component';

const routes: Routes = [
   { path: '', component: AppComponent, canActivate: [AuthGuard] },
   { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
   { path: 'login', component: LoginComponent },
   { path: 'privacy_policy', component: PrivacyComponent },
   { path: 'report', component: ReportComponent },
   {
      path: 'create_article',
      component: CreatePostComponent,
      canActivate: [AuthGuard],
   },
   { path: 'create_user', component: SignupComponent },
   { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
   {
      path: 'create_category',
      component: CreateCategoryComponent,
      canActivate: [AuthGuard],
   },
   { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
   {
      path: 'article/:id',
      component: PostDetailComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'adveatiser',
      component: AdveatiserComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'adveatiser/create',
      component: CreateAdveatiserComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'adveatiser/edit/:id',
      component: EditAdveatiserComponent,
      canActivate: [AuthGuard],
   },

   {
      path: 'adveatiser/view/:id',
      component: ViewAdveatiserComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'recharge',
      component: RechargeComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'recharge/create',
      component: CreateRechargeComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'recharge/edit/:id',
      component: CreateRechargeComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'advertisement',
      component: AdvertisementComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'advertisement/create',
      component: CreateAdvertisementComponent,
      canActivate: [AuthGuard],
   },
   {
      path: 'setting',
      component: General_settingsComponent,
      canActivate: [AuthGuard],
   },
   { path: '**', redirectTo: '' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
