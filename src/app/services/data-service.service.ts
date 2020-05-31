import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class dataService {

    omDbApiKeys = [
        "9b9a1ffb",
        "6256d27e",
        "311befe0",
        "a9ca8f09"
    ];

    themoviedbAPIKeys=  [
        "27c63e41921efe425eba0a4892d5ac70",
        "9c2f568080555b63b03969d1e2cfa0b9",
        "b64aa6d5c962c2d17d7b89a83d8e2405",
        "7e09c95e830764be8347704e17acdbbf"
    ];

    constructor(private http: HttpClient) { }

    getData(dataOf) {
        if (dataOf == "movie"){
            return this.http.get<any>('../../assets/db-data/movieMaster.json', {
                observe: "response"
            });
        }
        if ( dataOf == "series") {
            return this.http.get<any>('../../assets/db-data/tv_Master.json', {
                observe: "response"
            });
        }
    }

    getDataFromOmDb(imdbID) {
        let apiKey = this.omDbApiKeys[Math.floor(Math.random() * this.omDbApiKeys.length)];
        let url = "http://www.omdbapi.com/?apikey=" + apiKey + "&i=" + imdbID;
        return this.http.get<any>(url, {
            observe: "response"
        });
    }

    getMovieTrailer(imdbID) {
        let apiKey = this.themoviedbAPIKeys[Math.floor(Math.random() * this.themoviedbAPIKeys.length)];
        let url = "https://api.themoviedb.org/3/movie/"+ imdbID +"/videos?api_key="+ apiKey +"&language=en-US";
        return this.http.get<any>(url, {
            observe: "response"
        });
    }

    getSeriesTraielr(id){
        let apiKey = this.themoviedbAPIKeys[Math.floor(Math.random() * this.themoviedbAPIKeys.length)];
        let url = 'https://api.themoviedb.org/3/tv/' + id + '/videos?api_key='+ apiKey +'&language=en-US';
        return this.http.get<any>(url, {
            observe: "response"
        });

    }

}