import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'biblioteca', component: BibliotecaComponent },
  { path: 'user-lists', component: UserListsComponent },
  { path: 'followers', component: FollowersComponent },
  { path: 'following', component: FollowingComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'cart', component: CartComponent }
  

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
