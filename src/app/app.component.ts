import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tezedge-snapshots-explorer';

  constructor(private http : HttpClient) {
    this.http.get('http://162.55.241.136/mainnet/archive/').subscribe(x => console.log(x))
  }
}
