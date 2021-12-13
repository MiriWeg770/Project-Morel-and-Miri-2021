import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {HttpClientModule } from "@angular/common/http";
import { UserService } from './user.service';
import { FormsModule } from "@angular/forms";
import { AddMealComponent } from './add-meal/add-meal.component';
import { MyMenusComponent } from './my-menus/my-menus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { MyMealsComponent } from './my-meals/my-meals.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';;
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HeaderComponent } from './header/header.component';
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
import { ShowMenuDetailsComponent } from './show-menu-details/show-menu-details.component';
import { MyAccountComponent } from './my-account/my-account.component';
import {MatButtonModule} from '@angular/material/button';
import { ShowMealDetailsComponent } from './show-meal-details/show-meal-details.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DeletMealComponent } from './delet-meal/delet-meal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MealComponent } from './meal/meal.component';
import { MenuComponent } from './menu/menu.component';
import { DownloadComponent } from './download/download.component';
import { MakeAccountComponent } from './make-account/make-account.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RemoveShareComponent } from './remove-share/remove-share.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatGridListModule} from '@angular/material/grid-list';
import { DeletMenuComponent } from './delet-menu/delet-menu.component';
import { ShareComponent } from './share/share.component';
import { DeletPublishedMealComponent } from './delet-published-meal/delet-published-meal.component';
import { AllMealsComponent } from './all-meals/all-meals.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllMenusComponent } from './all-menus/all-menus.component';
import { RemoveShareToUpdateComponent } from './remove-share-to-update/remove-share-to-update.component';
import {NgxPrintModule} from 'ngx-print';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ManagerEntryComponent } from './manager-entry/manager-entry.component';
import { DeletUserComponent } from './delet-user/delet-user.component';
import { DeleteComponent } from './delete/delete.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DeleteShareComponent } from './delete-share/delete-share.component';
import { SendMessageToUserComponent } from './send-message-to-user/send-message-to-user.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { DeletManagerComponent } from './delet-manager/delet-manager.component';
import { ShareMenuComponent } from './share-menu/share-menu.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { DeletPublishedMenuComponent } from './delet-published-menu/delet-published-menu.component';
import { CheckProductsComponent } from './check-products/check-products.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PrintComponent } from './print/print.component';
import { PrintMealComponent } from './print-meal/print-meal.component';
import { PrintMenuComponent } from './print-menu/print-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent, 
    AddMealComponent,
    MyMenusComponent,
    AddMenuComponent,
    MyMealsComponent,
    HeaderComponent,
    ShowMenuDetailsComponent,
    MyAccountComponent,
    ShowMealDetailsComponent,
    DeletMealComponent,
    MealComponent,
    MenuComponent,
    DownloadComponent,
    MakeAccountComponent,
    RemoveShareComponent,
    DeletMenuComponent,
    ShareComponent,
    DeletPublishedMealComponent,
    AllMealsComponent,
    NotFoundComponent,
    AllMenusComponent,
    RemoveShareToUpdateComponent,
    SearchResultsComponent,
    ManagerEntryComponent,
    DeletUserComponent,
    DeleteComponent,
    AddCategoryComponent,
    DeleteShareComponent,
    SendMessageToUserComponent,
    AddManagerComponent,
    DeletManagerComponent,
    ShareMenuComponent,
    AddUnitComponent,
    DeletPublishedMenuComponent,
    CheckProductsComponent,
    PrintComponent,
    PrintMealComponent,
    PrintMenuComponent
    
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
    MatSnackBarModule,
    DragDropModule,
    MatBadgeModule,
    MatGridListModule,
    NgxPrintModule,
    MatAutocompleteModule
 
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
