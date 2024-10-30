import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { RouterModule } from '@angular/router';



import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './Components/Navbar/Navbar.component';
import { LoadingComponent } from './Components/Loading/Loading.component';
import { FooterComponent } from './Components/Footer/Footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    NavbarComponent,
    LoadingComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
