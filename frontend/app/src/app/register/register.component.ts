import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
  username = '';
  password = '';
  message = '';

  constructor(private userService: UserService,private router: Router) { }


  createUser(){
    const user = localStorage.getItem('data');
    if (user == null) {

     this.userService.createUser(this.username, this.password,).subscribe(
      data => {
        console.log(data);
        this.message = "Registration successful !"
        localStorage.setItem('data', JSON.stringify(data));
        this.router.navigate(['/profile']);
      },
      error => {
        console.log(error);
        this.message = error.error;
      }
    );
   

  } else {
    this.message = "An account is already logged in";
  }
    
  }

  
}
