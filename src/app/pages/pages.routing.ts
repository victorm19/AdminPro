import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'buscar/:termino', component: BusquedasComponent, data: { titulo: 'Busquedas'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
            { path: 'charts', component: GraficaUnoComponent, data: { titulo: 'Charts'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promise'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },

            // Mantenimientos
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento usuarios'} },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento hospitales'} },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento médicos'} },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico'} },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
