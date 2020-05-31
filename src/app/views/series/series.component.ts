import { Component, OnInit } from '@angular/core';
import { dataService } from './../../services/data-service.service'
import { DomSanitizer } from '@angular/platform-browser'
@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

    // omdbResponse =  {};
    name = ""
    rating: string = undefined
    yt_iframe_html: any;
    vimeo_iframe_html: any;
    dm_iframe_html: any;
    // omdbResponse: any = {}
    url = undefined;
    safeUrl = undefined;
    omdbResponse = {imdbRating:0}
    seriesData: Array<any> = undefined;
    videoType: Array<string> = ["teaser", "trailer"]

    constructor(
        private dataService: dataService,
        private _sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        // this.omdbResponse = { "Title": "House", "Year": "2004–2012", "Rated": "TV-14", "Released": "16 Nov 2004", "Runtime": "44 min", "Genre": "Drama, Mystery", "Director": "N/A", "Writer": "David Shore", "Actors": "Hugh Laurie, Omar Epps, Robert Sean Leonard, Jesse Spencer", "Plot": "An antisocial maverick doctor who specializes in diagnostic medicine does whatever it takes to solve puzzling cases that come his way using his crack team of doctors and his wits.", "Language": "English", "Country": "USA", "Awards": "Won 2 Golden Globes. Another 55 wins & 138 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BMDA4NjQzN2ItZDhhNC00ZjVlLWFjNTgtMTEyNDQyOGNjMDE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "8.7/10" }], "Metascore": "N/A", "imdbRating": "8.7", "imdbVotes": "396,914", "imdbID": "tt0412142", "Type": "series", "totalSeasons": "8", "Response": "True" };
        this.getData()
    }
    getData() {
        this.dataService.getData("series")
            .subscribe((data) => {
                this.seriesData = data.body
                // console.log(this.seriesData)
                var item = this.seriesData[Math.floor(Math.random() * this.seriesData.length)];
                // console.log(item)
                let movieDbId = item["_id"]
                let imdbID = item["Const"]
                this.dataService.getDataFromOmDb(imdbID).subscribe((data) => {
                    this.omdbResponse = data.body
                    // console.log(this.omdbResponse)
                    this.dataService.getSeriesTraielr(movieDbId).subscribe((data) => {
                        let trailerResults = data.body.results;
                        // console.log(trailerResults)
                        if (trailerResults.length > 0) {
                            for (let i = 0; i < trailerResults.length; i++) {
                                // console.log(i)
                                let element = trailerResults[i]
                                if (this.videoType.includes(element["type"].toString().toLowerCase()) && element["site"] == "YouTube") {
                                    this.url = "https://www.youtube.com/embed/" + element["key"]
                                    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.url);
                                    // console.log("Sefe URL IS ... \t",this.safeUrl)
                                    break
                                }
                            }
                        } 
                        else {
                            this.safeUrl = undefined
                        }

                    })

                })
            });
    }

}
