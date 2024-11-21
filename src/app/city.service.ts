import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Der Service wird global bereitgestellt
})
export class CityService {
  private baseUrl = 'http://api.zippopotam.us';

  constructor(private http: HttpClient) {
    console.log('CityService initialized'); // Debugging
  }

  getCityData(countryCode: string, postalCode: string): Observable<any> {
    const url = `${this.baseUrl}/${countryCode}/${postalCode}`;
    return this.http.get<any>(url); // API-Aufruf
  }
}
