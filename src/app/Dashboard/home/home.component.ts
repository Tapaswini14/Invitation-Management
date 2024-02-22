import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TmApiService } from 'src/app/shared/tmApi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public chartBar: any;
  selectedOption: string | undefined;
  constructor(private apiService: TmApiService, private router: Router) {}
  items: any[] = [];

  ngOnInit(): void {
    this.fetchItems();
  }

  selectedRitualControl = new FormControl();

  fetchItems() {
    this.apiService.getrituals().subscribe(
      (data) => {
        this.items = data.rituals;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getSelectedRitualValue() {
    // Access the value of the FormControl
  }

  onRitualSelect() {
    localStorage.setItem('ritualId', this.selectedRitualControl.value);
    const selectedRitualId = this.selectedRitualControl.value;

    // Perform routing based on the selected ritual ID
    switch (selectedRitualId) {
      case '1':
        this.router.navigate(['']); // Navigate to '/route1' when 'Ritual 1' is selected
        break;
      case '2':
        this.router.navigate(['/wedding-invitation']); // Navigate to '/route2' when 'Ritual 2' is selected
        break;
      case '3':
        this.router.navigate(['/christian-bride-wedding']); // Navigate to '/route2' when 'Ritual 2' is selected
        break;
      case '4':
        this.router.navigate(['/muslim-wedding-invitation']); // Navigate to '/route2' when 'Ritual 2' is selected
        break;
      case '5':
        this.router.navigate(['/birthday-invitation']); // Navigate to '/route2' when 'Ritual 2' is selected
        break;
      case '6':
        this.router.navigate(['/thread-ceremony']); // Navigate to '/route2' when 'Ritual 2' is selected
        break;
      case '7':
        this.router.navigate(['/house-warming']); // Navigate to '/route2' when 'Ritual 2' is selected
        break;
      case '8':
        this.router.navigate(['/business-opening']); // Navigate to '/route2' when 'Ritual 2' is selected
        break;
      // Add more cases as needed
      default:
        break;
    }
  }
}
