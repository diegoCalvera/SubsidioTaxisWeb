import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard/recarga'
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        redirectTo: 'dashboard/recarga'
    },
    {
        path: 'dashboard',
        //...canActivate(() => redirectUnauthorizedTo(['auth'])),
        loadComponent: () => import('./dashboard/dashboard.component').then(d => d.DashboardComponent),
        children : [
            {
                path : 'recarga',
                loadComponent : () => import('./dashboard/pages/recarga/recarga.component').then(l => l.RecargaComponent)
            },
            {
                path : 'parametrizacion',
                loadComponent : () => import('./dashboard/pages/parametrizacion/parametrizacion.component').then(l => l.ParametrizacionComponent)
            },
            {
                path : 'alerta',
                loadComponent : () => import('./dashboard/pages/alerta/alerta.component').then(l => l.AlertaComponent)
            },
            {
                path : 'transacciones',
                loadComponent : () => import('./dashboard/pages/transacciones/transacciones.component').then(l => l.TransaccionesComponent)
            },
            {
                path : 'reporte',
                loadComponent : () => import('./dashboard/pages/reporte/reporte.component').then(l => l.ReporteComponent)
            },
            
        ]
    },
   

];
