import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Buffer } from 'buffer';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  imageUrl: string | undefined;

  image1Url: string | undefined;
  image2Url: string | undefined;
  imageUrls: String[] = [];
  message = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    const data = localStorage.getItem('data');
   
    if (data) { 
      this.showImages();
      this.user = JSON.parse(data);
      const jsonBuffer = this.user.profilePicture.data;
      console.log(this.user);
      const buffer = Buffer.from(jsonBuffer, 'utf-8');
      const base64String = buffer.toString('base64');

      this.imageUrl = `data:image/png;base64,${base64String}`;

    } else {
      this.message = "No account is logged in";
    }


  }






  save(): void {
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('data', JSON.stringify(data));
          this.message = 'O Nome de Utilizador foi alterado com sucesso!';
        },
        error => {
          console.log(error);
          this.message = error.error;
        }
      );
    }
  }

  showImages(): void {
    console.log('trying to get images');
    this.userService.getImages().subscribe(
      data => {

        const images = data;

        for (let i = 0; i < images.length; i++) {
          const jsonBuffer = images[i].data;
          const buffer = Buffer.from(jsonBuffer, 'utf-8');
          const base64String = buffer.toString('base64');
          this.imageUrls[i] = `data:image/png;base64,${base64String}`;

        };

      },
      error => {
        console.log(error);
        this.message = error.error;
      }
    );
  }


  saveImage(imageNumber: number): void {
    var imageName = '';
    switch (imageNumber) {
      case 0:
        imageName = 'scott.png';
        break;
      case 1:
        imageName = 'darthvader.png';
        break;
      case 2:
        imageName = 'xbox.png';
        break;
      case 3:
        imageName = 'mqueen.png';
        break;
    }
    if (this.user) {
      this.userService.updateImage(this.user, imageName).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('data', JSON.stringify(data));
          this.message = 'A Imagem de Perfil foi atualizada! Efetue refresh para verificar a alteração';
        },

        error => {
          console.log(error);
          this.message = error.error;
        }
      );
    }
  }


}
