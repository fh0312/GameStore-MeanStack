import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CartService } from './cart.service';
import { CartComponent } from './cart/cart.component';
import { CommonModule } from '@angular/common';
import { ItemSearchComponent } from './item-search/item-search.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthComponent,
    ProfileComponent,
    DashboardComponent,
    BibliotecaComponent,
    UserListsComponent,
    WishlistComponent,
    FollowersComponent,
    FollowingComponent,
    ItemListComponent,
    ItemDetailComponent,
    CartComponent,
    ItemSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    UserService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
