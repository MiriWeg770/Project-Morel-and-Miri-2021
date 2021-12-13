import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyMenusComponent } from './my-menus/my-menus.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { MyMealsComponent } from './my-meals/my-meals.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ShowMenuDetailsComponent } from './show-menu-details/show-menu-details.component';
import { ShowMealDetailsComponent } from './show-meal-details/show-meal-details.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { HeaderComponent } from './header/header.component';
import { DownloadComponent } from './download/download.component';
import { AllMealsComponent } from './all-meals/all-meals.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllMenusComponent } from './all-menus/all-menus.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ManagerEntryComponent } from './manager-entry/manager-entry.component';

const routes: Routes = [
  // {path:"Home", component:HomeComponent},
  {path:"Home", component:HeaderComponent,children:[
    {path:"MyMeals",component:MyMealsComponent},
    {path:"AllMeals",component:AllMealsComponent},
    {path:"AllMenus",component:AllMenusComponent},
    {path:"ShowMealDetails/:id",component:ShowMealDetailsComponent}, 
    {path:"ShowMealDetails",component:ShowMealDetailsComponent}, 
    {path:"ShowMenuDetails/:id",component:ShowMenuDetailsComponent}, 
    {path:"MyAccount",component:MyAccountComponent},
    {path:"AddMeal", component:AddMealComponent},
    {path:"MyMenus", component:MyMenusComponent},
    {path:"AddMenu", component:AddMenuComponent},
    {path:"SignUp", component:SignUpComponent},
    {path:"NotFound", component:NotFoundComponent},
    {path:"SearchResults",component:SearchResultsComponent}, 

    {path:"", component:HomeComponent, pathMatch:"full"},
    {path:"**", component:NotFoundComponent, pathMatch:"full"}

  ]},
  {path:"ManagerEntry",component:ManagerEntryComponent},
  {path:"", redirectTo:"Home", pathMatch:"full"},
  {path:"**", redirectTo:"Home/NotFound", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
