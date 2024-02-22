import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sidenavOpened = false;

  title = 'Pharmacy';
  offcanvasVisible: boolean | undefined;
  constructor(private router: Router) {}

  shouldShowNav(): boolean {
    const result1 = this.router.url !== '/login';
    const result2 = this.router.url !== '/not_found'
    return result1 && result2;
  }
  // shouldShownNot_Found(): boolean {
  //   const result = this.router.url !== '/not_found';
  //   return result;
  // }

  toggleDrawer() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  toggleDrawerClose() {
    this.sidenavOpened = false;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
      });
  }
}
