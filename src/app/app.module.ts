import { CategoriesComponent } from './main/categories/categories.component';
import { FormatMoneyPipe } from './../custom_pipes/format.money.pipe';
import { StatisticComponent } from './main/statistic/statistic.component';
import { SettingsComponent } from './main/settings/settings.component';
import { BalanceComponent } from './main/balance/balance.component';
import { DBService } from './../services/db.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';

import { SetupComponent } from './main/setup/setup.component';

// import ngx-translate and the http loader
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { MainInputComponent } from './main/main-input.component/main-input.component';
import { PopupComponent } from './main/popup/popup.component';
import { ListComponent } from './main/list/list.component';

// routes for the router
const appRoutes: Routes = [
    { path: '', component: AppComponent }
    //   { path: 'hero/:id',      component: HeroDetailComponent },
    //   {
    //     path: 'heroes',
    //     component: HeroListComponent,
    //     data: { title: 'Heroes List' }
    //   },
    //   { path: '',
    //     redirectTo: '/heroes',
    //     pathMatch: 'full'
    //   },
    //   { path: '**', component: PageNotFoundComponent }
];
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent,
        LoginComponent,
        SetupComponent,
        BalanceComponent,
        SettingsComponent,
        StatisticComponent,
        MainInputComponent,
        CategoriesComponent,
        FormatMoneyPipe,
        PopupComponent,
        ListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterModule.forRoot(appRoutes)
    ],
    providers: [DBService, LoginService],
    bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
