import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer } from '@angular/platform-browser'
import { dataService } from './../../services/data-service.service'

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
    name = ""
    rating: string = undefined
    yt_iframe_html: any;
    vimeo_iframe_html: any;
    dm_iframe_html: any;
    omdbResponse: any = {}
    url = undefined;
    safeUrl = undefined;
    moviesData: Array<any> = undefined;
    showLoader: boolean = true;
    videoType: Array<string> = ["teaser","trailer"]
    // omdbResponse = {"Title":"John Wick","Year":"2014","Rated":"R","Released":"24 Oct 2014","Runtime":"101 min","Genre":"Action, Crime, Thriller","Director":"Chad Stahelski, David Leitch","Writer":"Derek Kolstad","Actors":"Keanu Reeves, Michael Nyqvist, Alfie Allen, Willem Dafoe","Plot":"An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.","Language":"English, Russian, Hungarian","Country":"USA, UK, China","Awards":"5 wins & 8 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.4/10"},{"Source":"Rotten Tomatoes","Value":"86%"},{"Source":"Metacritic","Value":"68/100"}],"Metascore":"68","imdbRating":"7.4","imdbVotes":"505,034","imdbID":"tt2911666","Type":"movie","DVD":"03 Feb 2015","BoxOffice":"N/A","Production":"LionsGate Entertainment","Website":"N/A","Response":"True"};
    constructor(
        private embedService: EmbedVideoService,
        private _sanitizer: DomSanitizer,
        private dataService: dataService
    ) {

    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.dataService.getData("movie")
            .subscribe((data) => {
                this.moviesData = data.body
                // console.log(this.moviesData)
                var item = this.moviesData[Math.floor(Math.random() * this.moviesData.length)];
                // console.log(item)
                let imdbID = item["id"]
                this.dataService.getDataFromOmDb(imdbID).subscribe((data) => {
                    this.omdbResponse = data.body
                    // console.log(this.omdbResponse)
                    this.dataService.getMovieTrailer(imdbID).subscribe((data) => {
                        let trailerResults = data.body.results;
                        this.showLoader = false;
                        // console.log(trailerResults)
                        if (trailerResults.length > 0) {
                            for (let i=0; i<trailerResults.length; i++){
                                // console.log(i)
                                let element = trailerResults[i]
                                if (this.videoType.includes(element["type"].toString().toLowerCase())   && element["site"] == "YouTube" ){
                                    this.url = "https://www.youtube.com/embed/"+element["key"]
                                    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.url);
                                    // console.log(this.safeUrl)
                                    break
                                }
                            }
                        } else {
                            this.safeUrl = undefined;
                        }
                        
                    })

                })
            });
    }

}
