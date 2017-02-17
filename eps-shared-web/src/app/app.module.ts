import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { AdsFormComponentComponent } from './ads-form-component/ads-form-component.component';


const appRoutes: Routes = [
  { path: 'ad/:id',      component: AdsFormComponentComponent },
  {
    path: 'ads',
    component: AdsListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/ads',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AdsListComponent,
    AdsFormComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
