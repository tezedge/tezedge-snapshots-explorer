import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  activeTheme: string;

  ngOnInit(): void {
    this.activeTheme = localStorage.getItem('theme') || 'dark';
    this.changeTheme(this.activeTheme);
  }

  changeTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.activeTheme = theme;

    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add('theme-' + theme);
  }
}
