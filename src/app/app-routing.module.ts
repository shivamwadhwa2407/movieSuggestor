import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesComponent } from "../app/views/series/series.component"
import { MoviesComponent } from "../app/views/movies/movies.component"


const routes: Routes = [
  { path: "" , component: MoviesComponent},
  { path:"tvSeries", component: SeriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
