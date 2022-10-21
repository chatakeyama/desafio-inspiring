import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardGameComponent } from './components/card-game/card-game.component';
import { GamesListComponent } from './pages/games-list/games-list.component';
import { SlicePipe } from './pipes/slice-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardGameComponent,
    GamesListComponent,
    SlicePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
