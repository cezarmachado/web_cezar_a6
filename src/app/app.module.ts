import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID, ViewContainerRef} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {Ng2AutoCompleteModule} from 'ng2-auto-complete';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import {ROUTES} from './app.routes'

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthService} from './auth/auth.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {SnackbarComponent} from './shared/messages/snackbar/snackbar.component';
import {NotificationService} from './shared/messages/notification.service';
import {ProfileComponent} from './profile/profile.component';
import {ProfileService} from './profile/profile.service';
import {GlobalParametersComponent} from './configurations/global-parameters/global-parameters.component';
import {EmailParamComponent} from './configurations/global-parameters/email-param/email-param.component';
import {GlobalParametersTabsComponent} from './configurations/global-parameters/global-parameters-tabs/global-parameters-tabs.component'
import {GlobalParamService} from './configurations/global-parameters/global.parameters.services';
import {EmailTestComponent} from './configurations/global-parameters/email-param/email-test/email-test.component';
import { TesteComponent } from './teste/teste.component';
import { TesteService } from './teste/teste.services';



@NgModule({


declarations: [
 AppComponent,
 AuthComponent,
 HeaderComponent,
 FooterComponent,
 MenuComponent,
 HomeComponent,
 SnackbarComponent,
 ProfileComponent,
 GlobalParametersComponent,
 EmailParamComponent,
 GlobalParametersTabsComponent,
 EmailTestComponent,
 TesteComponent,
],
imports: [
 BrowserModule,
 ToastrModule.forRoot() ,
 Ng2AutoCompleteModule,
 NguiAutoCompleteModule,
 BrowserAnimationsModule,
 HttpModule,
 ReactiveFormsModule,
 FormsModule,
 RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules})
],
 providers: [AuthService, 
            NotificationService, 
            ProfileService, 
            GlobalParamService,
            TesteService,
 { provide: LocationStrategy, useClass: HashLocationStrategy}, { provide: LOCALE_ID, useValue: 'pt-BR'}],
 bootstrap: [AppComponent]
})
export class AppModule {}
