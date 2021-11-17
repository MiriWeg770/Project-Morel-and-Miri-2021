import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { MyMenusComponent } from './my-menus/my-menus.component';
import { AllListsComponent } from './all-lists/all-lists.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { MyMealsComponent } from './my-meals/my-meals.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { MyHistoryComponent } from './my-history/my-history.component';
import { SettingsComponent } from './settings/settings.component';
import { HelpComponent } from './help/help.component';
import { MySharesComponent } from './my-shares/my-shares.component';
import { ShowMenuDetailsComponent } from './show-menu-details/show-menu-details.component';
import { ShowMealDetailsComponent } from './show-meal-details/show-meal-details.component';
import { AddMealComponent } from './add-meal/add-meal.component';
import { UserComponent } from './user/user.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './header/header.component';
import { DownloadComponent } from './download/download.component';
import { EditMealComponent } from './edit-meal/edit-meal.component';
import { AllMealsComponent } from './all-meals/all-meals.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { AllMenusComponent } from './all-menus/all-menus.component';
import { MealCategoryComponent } from './meal-category/meal-category.component';

const routes: Routes = [
  // {path:"Home", component:HomeComponent},
  {path:"Home", component:HeaderComponent,children:[
    {path:"MyMeals",component:MyMealsComponent},
    {path:"AllLists",component:AllListsComponent},
    {path:"AllMeals",component:AllMealsComponent},
    {path:"AllMenus",component:AllMenusComponent},
    {path:"MyLists",component:MyListsComponent},
    {path:"EditMeal/:id",component:EditMealComponent},
    {path:"MealCategory/:id",component:MealCategoryComponent},
    {path:"Settings",component:SettingsComponent},
    {path:"Help",component:HelpComponent},
    {path:"MyShares",component:MySharesComponent},
    {path:"ShowMealDetails/:id",component:ShowMealDetailsComponent}, 
    {path:"ShowMealDetails",component:ShowMealDetailsComponent}, 
    {path:"ShowMenuDetails/:id",component:ShowMenuDetailsComponent}, 
    {path:"MyAccount",component:MyAccountComponent},
    {path:"AddMeal", component:AddMealComponent},
    {path:"MyMenus", component:MyMenusComponent},
    {path:"AddMenu", component:AddMenuComponent},
    {path:"MyEvent", component:CalendarComponent},
    {path:"MyHistory",component:MyHistoryComponent},
    {path:"SignUp", component:SignUpComponent},
    {path:"SignIn", component:SignInComponent},
    {path:"User", component:UserComponent},
    {path:"User", component:UserComponent},
    {path:"NotFound", component:NotFoundComponent},
    {path:"About", component:AboutComponent},

    {path:"", component:HomeComponent, pathMatch:"full"},
    {path:"**", component:NotFoundComponent, pathMatch:"full"}

  ]},
  {path:"User",component:UserComponent,children:[
    
    {path:"", redirectTo:"MyMeals", pathMatch:"full"},
  ]},

  {path:"ResetPassword",component:ResetPasswordComponent},
  {path:"", redirectTo:"Home/NotFound", pathMatch:"full"},
  {path:"**", redirectTo:"Home/NotFound", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
