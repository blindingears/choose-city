import { Component } from '@angular/core';
import { CityService } from '../city.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule], // Importiere ReactiveFormsModule
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss'],
})
export class CitySelectorComponent {

  selectedCity: string = '';
  cityData: any = null;

  onCityChange(city: string) {
    this.selectedCity = city;
  };

  // Erstelle das Formular
  cityForm = new FormGroup({
    city: new FormControl('', Validators.required), // Feld mit Validierung
  });

  isLoading = false; // Zeigt einen Ladeindikator an
  error: string | null = null; // Zeigt Fehler an

  private cityMappings: { [key: string]: { country: string; postalCode: string } } = {
    Berlin: { country: 'de', postalCode: '10115' },
    Paris: { country: 'fr', postalCode: '75001' },
    Madrid: { country: 'es', postalCode: '28001' },
    Rome: { country: 'it', postalCode: '00100' },
    London: { country: 'gb', postalCode: 'EC1A' },
    Cairo: { country: 'eg', postalCode: '11511' },
    Delhi: { country: 'in', postalCode: '110001' },
  };

  constructor(private cityService: CityService) {
    console.log('CitySelectorComponenten initialisiert mit CityService');
  }

  submitForm() {
    if (this.cityForm.valid) {
      const selectedCity = this.cityForm.value.city!;
      const mapping = this.cityMappings[selectedCity];

      if (mapping) {
        this.fetchCityData(mapping.country, mapping.postalCode);
      } else {
        this.error = 'Stadt konnte nicht gefunden werden.';
      }
    }
  }

  private fetchCityData(countryCode: string, postalCode: string) {
    this.isLoading = true;
    this.error = null;

    this.cityService.getCityData(countryCode, postalCode).subscribe({
      next: (data) => {
        this.cityData = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Daten konnten nicht geladen werden.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

}
