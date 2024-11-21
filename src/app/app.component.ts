import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CitySelectorComponent } from './city-selector/city-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CitySelectorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'choose-city';
}
