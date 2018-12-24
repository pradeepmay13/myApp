import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';


const routes:Routes=[
	{ path: '', redirectTo: 'login',pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '/' },
	{ path:'**', component: PagenotfoundComponent }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[
  	RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
export const routingComponent=[ 
	LoginComponent, 
	PagenotfoundComponent,
  HomeComponent
]
