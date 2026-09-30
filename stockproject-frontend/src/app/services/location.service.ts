import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocationItem {
  id?: number;
  name: string;
  type: string;
  address: string;
  manager: string;
  stock: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = 'http://localhost:8080/api/locations';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<LocationItem[]> {
    return this.http.get<LocationItem[]>(this.apiUrl);
  }

  getLocationById(id: number): Observable<LocationItem> {
    return this.http.get<LocationItem>(`${this.apiUrl}/${id}`);
  }

  createLocation(location: LocationItem): Observable<LocationItem> {
    return this.http.post<LocationItem>(this.apiUrl, location);
  }

  updateLocation(id: number, location: LocationItem): Observable<LocationItem> {
    return this.http.put<LocationItem>(`${this.apiUrl}/${id}`, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
