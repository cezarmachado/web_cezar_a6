import {Routes} from '@angular/router'
import {AuthComponent} from './auth/auth.component'
import {HomeComponent} from './home/home.component'
import {TesteComponent} from './teste/teste.component'
import {ProfileComponent} from './profile/profile.component'

export const ROUTES: Routes = [
    {path: '', component: AuthComponent},
    {path: 'home', component: HomeComponent,
        children: [
            {path: '', redirectTo: 'teste', pathMatch: 'full'},
            {path: 'teste', component: TesteComponent},
            {path: 'profile', component: ProfileComponent},
            
        ]}
    ]
