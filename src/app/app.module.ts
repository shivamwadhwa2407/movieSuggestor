import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './views/movies/movies.component';
import { SeriesComponent } from './views/series/series.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { EmbedVideo } from 'ngx-embed-video';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './views/nav-bar/nav-bar.component';
import { FooterComponent } from './views/footer/footer.component';
import { dataService } from '../app/services/data-service.service'


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SeriesComponent,
    NavBarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ProgressbarModule.forRoot(),
    HttpClientModule,
    EmbedVideo.forRoot()
  ],
  providers: [dataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

