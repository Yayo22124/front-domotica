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
        path: "bedroom/:location",
        async loadComponent() {
            const component = await import("./pages/bedrooms-page/bedrooms-page.component");

            return component.BedroomsPageComponent;
        },
    },
    {
        path: "livingroom/:location",
        async loadComponent() {
            const component = await import("./pages/livingrooms/livingrooms.component");

            return component.LivingroomsComponent;
        },
    },
    {
        path: "garage/:location",
        async loadComponent() {
            const component = await import("./pages/garages-page/garages-page.component");

            return component.GaragesPageComponent;
        },
    },
    {
        path: "bathroom/:location",
        async loadComponent() {
            const component = await import("./pages/bathrooms-page/bathrooms-page.component");

            return component.BathroomsPageComponent;
        },
    },
    // {
    //     path: "kitchen/:location",
    //     async loadComponent() {
    //         const component = await import("./pages/kirchens-page/kitchens-page.component");

    //         return component.KitchensPageComponent;
    //     },
    // },
];
