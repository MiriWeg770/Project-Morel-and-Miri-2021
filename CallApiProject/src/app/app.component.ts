import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CallApiProject';
  
gnOnInit(){
}

ngOnInit(){

  window.addEventListener("keyup", this.disableF5);

  window.addEventListener("keydown", this.disableF5);
}


  disableF5(e) {

    if ((e.which || e.keyCode) == 116) e.preventDefault(); 

 };
}



  


