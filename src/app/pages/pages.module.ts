import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'
import { ComponentModule } from '../components/component.module';

// Componentes
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    GraficaUnoComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  exports:[
    ProgressComponent,
    DashboardComponent,
    GraficaUnoComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentModule
  ]
})
export class PagesModule { }
