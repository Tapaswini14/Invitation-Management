import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent {
  @Output() sideNavToggled = new EventEmitter<void>();
  menuStatus: boolean = true;
  constructor(private router: Router) {}

  name = sessionStorage.getItem('name');
}
