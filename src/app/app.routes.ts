import { HomePageComponent } from './pages/home-page/home-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
    },
    {
        path: "home",
        loadComponent: () => import("./pages/home-page/home-page.component").then(component => component.HomePageComponent)
    },
    {
        path: "bedrooms",
        loadComponent: () => import("./pages/bedrooms/bedrooms.component").then(componente => componente.BedroomsComponent)
    }
];
