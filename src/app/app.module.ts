import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule, routingComponent } from './routing/routing.module';
import { AppComponent } from './app.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule  }    from '@angular/http';
import { AuthGuard } from './guard/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GithubAuthInterceptor } from './interceptors/githubauth.interceptor';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { FormPopulationService } from './services/form-population.service';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//https://valor-software.com/ngx-bootstrap/
import { TypeaheadModule, TooltipModule, TimepickerModule, TabsModule, SortableModule, RatingModule, ProgressbarModule, PopoverModule, BsDatepickerModule, AlertModule, PaginationModule, AccordionModule, ButtonsModule, CarouselModule, CollapseModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    SortableModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.threeBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0.4)', 
        backdropBorderRadius: '4px',
        primaryColour: '#007bff', 
        secondaryColour: '#00FF00', 
        tertiaryColour: '#FF0000'
    })
  ],
   providers: [ AuthService, AuthGuard, FormPopulationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GithubAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
