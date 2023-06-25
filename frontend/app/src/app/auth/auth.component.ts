import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({ 
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  usernameLogin = '';
  passwordLogin = '';
  messageLogin = '';

  constructor(private userService: UserService,private router: Router) { }

  authenticate(){
    const user = localStorage.getItem('data');
    if (user == null) {
     
    this.userService.authenticateUser(this.usernameLogin, this.passwordLogin).subscribe(
      data => {
        console.log(data);
        this.messageLogin = "Authentication successful !";
        localStorage.setItem('data', JSON.stringify(data));
        
        // Add a delay of 2 seconds before navigating to dashboard
        setTimeout(() => {
          this.router.navigate(['/dashboard']); 
        }, 1000);
        
      },
      error => {
        console.log(error);
        this.messageLogin = error.error;
      }
    );

  } else {
    this.messageLogin = "An account is already logged in";
  }

}

}
