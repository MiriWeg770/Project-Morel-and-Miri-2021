import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Level } from 'src/Models/Level';
import { Meal } from 'src/Models/Meal';
import { MealCategories } from 'src/Models/MealCategories';
import { Menu } from 'src/Models/Menu';
import { MenuCategories } from 'src/Models/MenuCategories';
import { Picture } from 'src/Models/Picture';
import { Product } from 'src/Models/Product';
import { UnitMeasure } from 'src/Models/UnitMeasure';
import { User } from 'src/Models/User';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddManagerComponent } from '../add-manager/add-manager.component';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { DeletCategoryComponent } from '../delet-category/delet-category.component';
import { DeletManagerComponent } from '../delet-manager/delet-manager.component';
import { DeletUnitComponent } from '../delet-unit/delet-unit.component';
import { DeletUserComponent } from '../delet-user/delet-user.component';
import { DeleteShareComponent } from '../delete-share/delete-share.component';
import { DeleteComponent } from '../delete/delete.component';
import { LevelService } from '../level.service';
import { MealCategoriesService } from '../meal-categories.service';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';
import { PictureService } from '../picture.service';
import { RemoveShareComponent } from '../remove-share/remove-share.component';
import { SendMessageToUserComponent } from '../send-message-to-user/send-message-to-user.component';
import { ShareComponent } from '../share/share.component';
import { UnitMeasureService } from '../unit-measure.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manager-entry',
  templateUrl: './manager-entry.component.html',
  styleUrls: ['./manager-entry.component.css']
})
export class ManagerEntryComponent implements OnInit {

  managerUser:User
  manager=false;
  managers=false
  user=true
  meal=false
  menu=false
  product=false
  categories=false
  unitMeasure=false

  Users:User[]=[]
  Menus:Menu[]=[]
  Meals:Meal[]=[]
  Levels:Level[]=[] 
  Products:Product[]=[]
  MenuCategories:MenuCategories[]=[]
  MealCategories:MealCategories[]=[]
  UnitMeasures:UnitMeasure[]=[]
  Pictures:Picture[]=[]
  Managers:User[]=[]

  UsersTable:string[]=[" ","?????? ??????????","???? ??????????"," ?????????? ????????????",""]
  MenusTable:string[]=["?????? ??????????","???? ??????????","??????????????","??????????","?????? ????????","???????? ????????","????????","???????? ??????????","???? ??????????",""]
  MealsTable:string[]=[" ","?????? ??????","???? ??????","??????????????","???????? ????????????","?????? ????????","???????? ??????????????","????????","???????? ??????????","???? ??????????"," "]
  ProductTable:string[]=["?????? ????????","???? ????????",""]
  MenuCategoriesTable:string[]=["?????? ??????????????","???? ??????????????","???????? ??????????????",""]
  MealCategoriesTable:string[]=["?????? ??????????????","???? ??????????????","???????? ????????",""]
  UnitMeasuresTable:string[]=["?????? ????????","???? ????????","????????",""]
  ManagerTable:string[]=[" ","?????? ??????????","???? ??????????"," ?????????? ????????????",""]


  MealText=""
  MenuText=""
  UserText=""
  ProductText=""
  constructor(private userSer:UserService,private mealSer:MealService,private menuSer:MenuService,private levSer:LevelService,private mealcaSer:MealCategoriesService,
    private unitSer:UnitMeasureService,private dialog:MatDialog,private picSer:PictureService) {
      this.managerUser= JSON.parse(localStorage.getItem("manager"))
      if(this.managerUser!=null){
       this.GetAll()
       this.manager=true;
      }
      else{
        console.log("null")
       this.managerUser=new User(0,null,null,null,null,null)
      }
    console.log(this.manager);

  }

  ngOnInit(): void {
  }


  GetAll(){
    this.GetAllUsers()
    this.GetAllMeals()
    this.GetAllMenus()
    this.GetLevels()
    this.GetMenuCategories()
    this.GetMealCategories()
    this.GetAllProducts()
    this.GetAllUnitMeasures()
    this.GetPictures()
    
  }
  interval
  openMessage(){
    if(this.managerUser.password==null && this.managerUser.userName==null)
    document.getElementById("dialog2").style.display="block"
    else
    document.getElementById("dialog").style.display="block"
    let x=0
     this.interval = setInterval(() => {
    x++
    if(x==2){
    this.closeMessage()
    }
    console.log(x)
    },1000)
  }
  closeMessage(){
    clearInterval(this.interval)
    document.getElementById("dialog").style.display="none"
    document.getElementById("dialog2").style.display="none"
  }
  enter(){
    console.log(this.managerUser)
    this.userSer.IsManager(this.managerUser).subscribe(succ=>{
      console.log(succ)
      if(succ){
      this.manager=true
      // this.managerUser= JSON.parse(localStorage.getItem("user"))
      this.userSer.setManager(this.managerUser);
      localStorage.setItem("manager",JSON.stringify(this.managerUser))
      this.GetAll()
      }
      else{
        this.openMessage()
        console.log("not")
      }
    },err=>{console.log(err)})
    
    
  }
  out(){
    localStorage.removeItem("manager")
    this.manager=false
  }
  GetAllUsers(){
    this.userSer.GetAllUsers().subscribe(succ=>{
    this.Users=succ
    this.arrUser=succ
    this.GetAllManagers()
    console.log(succ)
    },err=>{console.log(err)})
  }
  GetAllMeals(){
    this.mealSer.GetAllUsersMeals().subscribe(succ=>{
    this.Meals=succ
    this.arrMeal=succ
    this.GetMealUser()
    this.GetMealProducts()
    console.log(succ)
    },err=>{console.log(err)})
  } 
  GetAllMenus(){
    this.menuSer.GetAllUsersMenus().subscribe(succ=>{
    this.Menus=succ
    this.arrMenu=succ
    this.GetMenuMeals()
    this.GetMenuUser()
    console.log(succ)
    },err=>{console.log(err)})
  }
  GetAllProducts(){
    this.mealSer.GetAllUsersMealsProducts().subscribe(succ=>{
      var mySet = new Set(succ);
       this.Products = [...mySet];
      this.arrProduct= [...mySet];
      console.log(succ)
    },err=>{console.log(err)
  })
  }
  GetAllManagers(){
    this.Managers=[]
    this.Users.forEach(element => {
      if(element.manager)
      this.Managers.push(element)
    });
    console.log(this.Managers)
  }
   GetLevels(){
    this.levSer.GetAllLevels().subscribe(succ=>{
     this.Levels=succ
    },err=>{console.log(err)})
  }
  Level(x:number){
    let le:string;
    this.Levels.forEach(element => {
      if(element.levelCode==x)
        le= element.levelName;
    });
    return le;
  } 
  GetMenuCategories(){
    this.menuSer.GetAllCategories().subscribe(succ=>{
      this.MenuCategories=succ
      console.log(succ)
    },err=>{console.log(err)})
  }
  CategoryMenu(x){
    let c;
    this.MenuCategories.forEach(element => {
      if(element.menuCategoriesCode==x)
       c=element.menuCategoriesName
    });
    return c
  }
  GetMenuMeals(){
    this.Menus.forEach(element => {
      this.menuSer.GetMenuMeals(element.menuCode).subscribe(succ=>{
      element.meals=succ
    })
    });
  }
  GetMenuUser(){
    this.Menus.forEach(element => {
      this.Users.forEach(element1 => {
      if(element1.userCode==element.userCode)
        element.userName=element1.userName
    });
    });
  }
  GetMealCategories(){
    this.mealcaSer.GetAllCategories().subscribe(succ=>{
      this.MealCategories=succ
      console.log(succ)
    },err=>{console.log(err)})
  }
  CategoryMeal(x){
    let c;
    this.MealCategories.forEach(element => {
      if(element.mealCategoriesCode==x)
       c=element.mealCategoriesName
    });
    return c
  }
  GetMealProducts(){
    let list:Product[]=[]
    this.Meals.forEach(element => {
      this.mealSer.GetProductsMeal(element.mealCode).subscribe(succ=>{
        element.products=succ
      },err=>{console.log(err)})

    });
    return list.length
  }
  GetMealUser(){
    this.Meals.forEach(element => {
      this.Users.forEach(element1 => {
        if(element.userCode==element1.userCode)
           element.userName=element1.userName
      });
    });
  } 
  GetAllUnitMeasures(){
    this.unitSer.GetAllUnitMeasures().subscribe(succ=>{
     this.UnitMeasures=succ
     console.log(succ)
    },err=>{console.log(err)})
  }
  GetUnit(x){
    let unit;
    this.UnitMeasures.forEach(element => {
      if(element.unitCode==x)
        unit=element.unitName
    });
    return unit;
  }
  GetPictures(){
    this.picSer.GetAllPictures().subscribe(succ=>{
      this.Pictures=succ
      console.log(succ)
   },err=>{
     console.log(err)
   })
  }
  GetPicture(x:number){
    let url="../../assets/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620.jpg";
    this.Pictures.forEach(element => {
     if(element.pictureCode==x)
        url= element.pictureName
   });
  return url     
  }
  check(x:number){
    switch (x) {
      case 1:this.user=true; this.meal=false ;this.menu=false;this.product=false;this.categories=false;this.unitMeasure=false;this.managers=false;break;   
      case 2:this.user=false; this.meal=false ;this.menu=true;this.product=false;this.categories=false;this.unitMeasure=false;this.managers=false;break;   
      case 3:this.user=false; this.meal=true ;this.menu=false;this.product=false;this.categories=false;this.unitMeasure=false;this.managers=false;break;   
      case 4:this.user=false; this.meal=false ;this.menu=false;this.product=false;this.categories=true;this.unitMeasure=false;this.managers=false;break;   
      case 5:this.user=false; this.meal=false ;this.menu=false;this.product=true;this.categories=false;this.unitMeasure=false;this.managers=false;break;   
      case 6:this.user=false; this.meal=false ;this.menu=false;this.product=false;this.categories=false;this.unitMeasure=true;this.managers=false;break;   
      case 7:this.user=false; this.meal=false ;this.menu=false;this.product=false;this.categories=false;this.unitMeasure=false;this.managers=true;break;   
      default:console.log("err");break;
    }
  } 
 DeletUser(x:User){
    let s=x.userName+" ???????? ???????????? ??????"
   const dialogRef = this.dialog.open(DeleteComponent, {
      data:s
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.userSer.DeletUser(x).subscribe(succ=>{
        console.log(succ)
        this.GetAllUsers()
      },err=>{console.log(err)})
       })
    }
 DeletMenu(x:Menu){
      let s=x.menuName+" ???????? "
     const dialogRef = this.dialog.open(DeleteComponent, {
        data:s
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result)
        this.menuSer.DeleteMenu(x).subscribe(succ=>{
          console.log(succ)
          this.GetAllMenus()
        },err=>{console.log(err)})})
    }
DeletMeal(x:Meal){
        let s=x.mealName+" ????????"
       const dialogRef = this.dialog.open(DeleteComponent, {
          data:s
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result)
          this.mealSer.DeleteMeal(x).subscribe(succ=>{
            console.log(succ)
            this.GetAllMeals()
          },err=>{console.log(err)})})
    }
ShareMeal(x:Meal){
  if(x.publish){
       const dialogRef = this.dialog.open(DeleteShareComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result){
          x.publish=false
          this.mealSer.UpdateMeal(x).subscribe(succ=>{
            console.log(succ)
            this.GetAllMeals()
          },err=>{console.log(err)})
        }
      else
         x.publish=true}
          )
    }
    else{
      x.publish=true
      this.mealSer.UpdateMeal(x).subscribe(succ=>{
        console.log(succ)  
        const dialogRef = this.dialog.open(ShareComponent, {
          data:x
        }); 
         this.GetAllMeals()
      },err=>{console.log(err)})
    }
    
  }
 ShareMenu(x:Menu){
    if(x.publish){
         const dialogRef = this.dialog.open(DeleteShareComponent, {
          });
          dialogRef.afterClosed().subscribe(result => {
            if(result){
            x.publish=false
            this.menuSer.UpdateMenu(x).subscribe(succ=>{
              console.log(succ)
              this.GetAllMenus()
            },err=>{console.log(err)})
          }
        else
           x.publish=true}
            )
      }
      else{
        x.publish=true
        this.menuSer.UpdateMenu(x).subscribe(succ=>{
          console.log(succ)  
          const dialogRef = this.dialog.open(ShareComponent, {
            data:x
          }); 
           this.GetAllMenus()
        },err=>{console.log(err)})
      }
      
    }
    AddMenu(){
      const dialogRef = this.dialog.open(AddMenuComponent, {
        disableClose:true,
        autoFocus:false,
        height:'100%',
        width:'100%',
        panelClass:'my-dialog'
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.GetAllMenus()
          console.log(result)
       });
      }
    UpdateMenu(x:Menu){
      const dialogRef = this.dialog.open(AddMenuComponent, {
      disableClose:true,
      autoFocus:false,
      data:x,
      height:'100%',
      width:'100%',
      panelClass:'my-dialog'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.GetAllMenus()
        console.log(result)
     });
    }
    UpdateMeal(x:Meal){
      console.log(x)
      const dialogRef = this.dialog.open(AddMealComponent, {
      disableClose:true,
      autoFocus:false,
      data:x,
      panelClass:'my-dialog',
      width:'70%',
      height:'100%',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.GetAllMeals()
     });
     }
    findMeal:Meal[]=[]
    arrMeal:Meal[]=[]
SearchMeal(){
      if(this.MealText==""){
        this.Meals=this.arrMeal
      }
      else{
        console.log(this.MealText)
        this.findMeal.length=0;
        this.Meals=this.arrMeal
        this.Meals.forEach(element => {
        if(element.mealName.includes(this.MealText)){ 
        this.findMeal.push(element);  
     }
    });
     this.Meals=this.findMeal
    }}
    findMenu:Menu[]=[]
    arrMenu:Menu[]=[]
SearchMenu(){
      if(this.MenuText==""){
        this.Menus=this.arrMenu
      }
      else{
        console.log(this.MenuText)
        this.findMenu.length=0;
        this.Menus=this.arrMenu
        this.Menus.forEach(element => {
        if(element.menuName.includes(this.MenuText)){ 
        this.findMenu.push(element);  
     }
    });
     this.Menus=this.findMenu
    }}
    findUser:User[]=[]
    arrUser:User[]=[]
SearchUser(){
      if(this.UserText==""){
        this.Users=this.arrUser
      }
      else{
        console.log(this.UserText)
        this.findUser.length=0;
        this.Users=this.arrUser
        this.Users.forEach(element => {
        if(element.userName.includes(this.UserText)){ 
        this.findUser.push(element);  
     }
    });
     this.Users=this.findUser
    }}
    findProduct:Product[]=[]
    arrProduct:Product[]=[]
SearchProduct(){
      if(this.ProductText==""){
        this.Products=this.arrProduct
      }
      else{
        console.log(this.ProductText)
        this.findProduct.length=0;
        this.Products=this.arrProduct
        this.Products.forEach(element => {
        if(element.productName.includes(this.ProductText)){ 
        this.findProduct.push(element);  
     }
    });
     this.Products=this.findProduct
    }}
    GetAllMealInCategory(x:MealCategories){
      let count=0;
      this.Meals.forEach(element => {
        if(element.mealCategoryCode==x.mealCategoriesCode)
        count++;
      });
      return count;
    }
    GetAllMenuInCategory(x:MenuCategories){
      let count=0;
      this.Menus.forEach(element => {
        if(element.menuCategoryCode==x.menuCategoriesCode)
        count++;
      });
      return count;
    }
AddMenuCategory(){
      let x:string=""
       const dialogRef = this.dialog.open(AddCategoryComponent, {
        data:x
      });
       dialogRef.afterClosed().subscribe(result => {
         console.log(result)
        if(result!=undefined){
          let c:MenuCategories=new MenuCategories(0,result)
        this.menuSer.AddMenuCategory(c).subscribe(succ=>{
          console.log(succ)
          this.GetMenuCategories()
        },err=>{console.log(err)})
        console.log(result)
        }
       })
    }
   
DeleteMenuCategory(x:MenuCategories){
    if(this.GetAllMenuInCategory(x)==0){
      let s=" ???????????????? "+ x.menuCategoriesName+ " ?????????? "
      const dialogRef = this.dialog.open(DeleteComponent, {
      data:s
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.menuSer.DeleteMenuCategory(x).subscribe(succ=>{
        console.log(succ)
        this.GetMenuCategories()
      },err=>{console.log(err)})
       })
      }
      else
      {
         this.dialog.open(DeletCategoryComponent);
      }
    }
UpdateMenuCategory(x:MenuCategories){
  const dialogRef = this.dialog.open(AddCategoryComponent, {
   data:x.menuCategoriesName
 });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
   if(result!=undefined){
     x.menuCategoriesName=result
   this.menuSer.UpdateMenuCategory(x).subscribe(succ=>{
     console.log(succ)
     this.GetMenuCategories()
   },err=>{console.log(err)})
   console.log(result)
   }
  })
    }
AddMealCategory(){
      let x:string=""
      const dialogRef = this.dialog.open(AddCategoryComponent, {
       data:x
     });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if(result!=undefined){
          let c:MealCategories=new MealCategories(0,result)
        this.mealcaSer.AddMealCategory(c).subscribe(succ=>{
          console.log(succ)
          this.GetMealCategories()
        },err=>{console.log(err)})
        console.log(result)
        }
      })
    }
DeleteMealCategory(x:MealCategories){
  if(this.GetAllMealInCategory(x)==0){
      let s=" ???????????????? "+ x.mealCategoriesName+ " ?????????? "
      const dialogRef = this.dialog.open(DeleteComponent, {
      data:s
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.mealcaSer.DeleteMealCategory(x).subscribe(succ=>{
        console.log(succ)
        this.GetMealCategories()
      },err=>{console.log(err)})
       })
      }
      else{
        this.dialog.open(DeletCategoryComponent)
      }
    }

UpdateMealCategory(x:MealCategories){
      const dialogRef = this.dialog.open(AddCategoryComponent, {
       data:x.mealCategoriesName
     });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if(result!=undefined){
          x.mealCategoriesName=result;
        this.mealcaSer.UpdateMealCategory(x).subscribe(succ=>{
          console.log(succ)
          this.GetMealCategories()
        },err=>{console.log(err)})
        console.log(result)
        }
      })
    }

    AddProduct(){
      let x:Product;
      const dialogRef = this.dialog.open(AddProductComponent, {
      data:x
     });
     dialogRef.afterClosed().subscribe(result=>{
       this.GetAllProducts()
     })
    
    }
    DeleteProduct(x:Product){
     this.mealSer.DeleteProduct(x).subscribe(succ=>{
       console.log(succ)
     },err=>{console.log(err)})
    }
SendMessage(u:User){
      let dialogRef= this.dialog.open(SendMessageToUserComponent,{
      data: u
      })
    }
AddManager(){
  let data:User=new User(0,null,null,null,null,true)
 const dialogRef=this.dialog.open(AddManagerComponent,{
   data:data
 })
 dialogRef.afterClosed().subscribe(result=>{
   this.GetAllUsers()
 })
}
DeletManager(x:User){
   const dialogRef = this.dialog.open(DeletManagerComponent, {
      data:x
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      x.manager=false
      this.userSer.UpdateUser(x).subscribe(succ=>{
        console.log(succ)
        this.Managers=[]
        this.GetAllUsers()
      },err=>{console.log(err)})
    }
 })
}
AddManagerFromUsers(){
  let data;
 const dialogRef=this.dialog.open(AddManagerComponent,{
   data:data,
   panelClass:'my-dialog',
   height:'100%'
 })
 dialogRef.afterClosed().subscribe(result=>{
   this.GetAllUsers()
 })
}
AddUnit(){
  let x:UnitMeasure;
  const dialogRef = this.dialog.open(AddUnitComponent, {
   data:x
 });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if(result!=undefined){
    this.unitSer.AddUnitMeasure(result).subscribe(succ=>{
      console.log(succ)
      this.GetAllUnitMeasures()
    },err=>{console.log(err)})
    console.log(result)
    }
  })
}
UpdateUnit(x:UnitMeasure){
  console.log(x)
  const dialogRef = this.dialog.open(AddUnitComponent, {
   data:x
 });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if(result!=undefined){
      x=result;
      x.convertionMeasureCode=Number(x.convertionMeasureCode)
    this.unitSer.UpdateUnitMeasure(x).subscribe(succ=>{
      console.log(succ)
      this.GetAllUnitMeasures()
    },err=>{console.log(err)})
    console.log(result)
    }
  })
}
DeletUnit(x:UnitMeasure){
  console.log(x)
  const dialogRef = this.dialog.open(DeletUnitComponent, {
   data:x
 });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result)
    if(result!=undefined){
      this.unitSer.DeleteUnitMeasure(x).subscribe(succ=>{
      console.log(succ)
      this.GetAllUnitMeasures()
    },err=>{console.log(err)})
    console.log(result)
    }
  })
}

}
