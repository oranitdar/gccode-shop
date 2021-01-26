import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title:string = 'gocode-shop or gccode';
  onToggle() {
    this.title = this.title ? '' : 'gocode-shop';
  }
  changeTitle(e: any) {
    this.title = (<HTMLInputElement>e.target).value;
  }
}
