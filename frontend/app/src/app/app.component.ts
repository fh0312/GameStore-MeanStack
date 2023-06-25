import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private router: Router) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const windowWidth = window.innerWidth;
    if (windowWidth < 780) {
      var nav = document.getElementById("nav");
      if(nav){
        nav.style.visibility="visible";
        nav.style.opacity="1";
      }
    }
  }

  ngOnInit(){
    if(screen.width < 780)
      this.showNav();
  }

  isAuth(): boolean{
    const data = localStorage.getItem('data');
    if(data){
      return true;
    }
    return false;
  }

  isHomePage() {
    return this.router.url === '/';
  }

  logout(){
    const data = localStorage.getItem('data');
    if (data) {
      localStorage.removeItem('data');

      //refresh da pagina
      window.location.reload();
    }
  }

  showNav(){
    if(screen.width < 780){
    var nav = document.getElementById("nav");
    if(nav){
      if(nav.style.visibility==="hidden"){
        nav.style.visibility="visible";
        nav.style.opacity="1";
      }
      else{
        nav.style.visibility="hidden";
        nav.style.opacity="0";
      }
    }
  }
  }

  removeNav(){
    if(screen.width < 780){
      var nav = document.getElementById("nav");
      if(nav){
        nav.style.visibility="hidden";
        nav.style.opacity="0";
      }
    }

    
  }

  goToHome(){
    this.router.navigateByUrl('/');
  }
}
