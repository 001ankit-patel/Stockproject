import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationService, LocationItem } from '../services/location.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locations.html',
  styleUrl: './locations.css'
})
export class Locations implements OnInit {

  searchText = '';
  locations: LocationItem[] = [];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (err) => {
        console.error('Failed to load locations from backend:', err);
      }
    });
  }

  get filteredLocations(): LocationItem[] {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.locations;
    }

    return this.locations.filter(location =>
      (location.id ? location.id.toString().includes(search) : false) ||
      (location.name ? location.name.toLowerCase().includes(search) : false) ||
      (location.type ? location.type.toLowerCase().includes(search) : false) ||
      (location.address ? location.address.toLowerCase().includes(search) : false) ||
      (location.manager ? location.manager.toLowerCase().includes(search) : false)
    );
  }

  get totalLocations(): number {
    return this.locations.length;
  }

  get totalStock(): number {
    return this.locations.reduce(
      (total, location) => total + (location.stock || 0),
      0
    );
  }

  get activeLocations(): number {
    return this.locations.filter(
      location => location.status === 'Active'
    ).length;
  }

  refreshLocations(): void {
    this.searchText = '';
    this.loadLocations();
  }
}