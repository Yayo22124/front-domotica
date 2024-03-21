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
    {
        path: "kitchen/:location",
        async loadComponent() {
            const component = await import("./pages/kitchens-page/kitchens-page.component");
            
            return component.KitchensPageComponent;
        },
    },
    // ! Sensor/Actuator Page Information
        {
            path: ":room/sensor/:location/:sensorName",          
            async loadComponent() {
                const component = await import("./pages/sensor-information-page/sensor-information-page.component")
                
                return component.SensorInformationPageComponent
            },
        },
        {
            path: ":room/actuator/:location/:actuatorName",
            async loadComponent() {
                const actuator = await import("./pages/actuator-information-page/actuator-information-page.component")
                
                return actuator.ActuatorInformationPageComponent
            },
        },
];

