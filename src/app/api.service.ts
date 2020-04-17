import { Injectable } from "@angular/core";

import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  endpoint = "https://corona.lmao.ninja/v2";

  countries: string;
  constructor(private http: HttpClient) {}

  //Location
  getCountryData(country): Observable<any> {
    return this.http.get(`${this.endpoint}/countries/${country}`);
  }

  getAllCountryData(): Observable<any> {
    return this.http.get(`${this.endpoint}/countries`);
  }
}
