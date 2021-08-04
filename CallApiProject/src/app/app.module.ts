import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {HttpClientModule } from "@angular/common/http";
import { UserService } from './user.service';
import { FormsModule } from "@angular/forms";
import { AddMealComponent } from './add-meal/add-meal.component';
import { MyMenusComponent } from './my-menus/my-menus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { MyHomeComponent } from './my-home/my-home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MyMealsComponent } from './my-meals/my-meals.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';;
import {MatDialogModule} from '@angular/material/dialog';
import { LogOutComponent } from './log-out/log-out.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AllListsComponent } from './all-lists/all-lists.component';
import { ShowMenuDetailsComponent } from './show-menu-details/show-menu-details.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { MyHistoryComponent } from './my-history/my-history.component';
import {MatButtonModule} from '@angular/material/button';
import { SettingsComponent } from './settings/settings.component';
import { HelpComponent } from './help/help.component';
import { MySharesComponent } from './my-shares/my-shares.component';
import { ShowMealDetailsComponent } from './show-meal-details/show-meal-details.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DeletMealComponent } from './delet-meal/delet-meal.component';
import { UserComponent } from './user/user.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CalendarComponent } from './calendar/calendar.component';
import { AddEventComponent } from './add-event/add-event.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    AddMealComponent,
    MyMenusComponent,
    AddMenuComponent,
    MyHomeComponent,
    ResetPasswordComponent,
    MyMealsComponent,
    LogOutComponent,
    HeaderComponent,
    SidenavComponent,
    AddProductComponent,
    DeleteProductComponent,
    EditProductComponent,
    AllListsComponent,
    ShowMenuDetailsComponent,
    MyAccountComponent,
    MyListsComponent,
    MyHistoryComponent,
    SettingsComponent,
    HelpComponent,
    MySharesComponent,
    ShowMealDetailsComponent,
    DeletMealComponent,
    UserComponent,
    CalendarComponent,
    AddEventComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,  
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule ,
    MatSnackBarModule
 
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
