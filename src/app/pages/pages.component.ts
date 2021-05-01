import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFuntions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  constructor(private readonly settingsService: SettingsService,
              private readonly sidebarService: SidebarService) { }

  ngOnInit(): void {
    customInitFuntions();
    this.sidebarService.cargarMenu();
  }

  

}
