import { Component, OnInit } from '@angular/core';

const MAX_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width : ${MAX_WIDTH_BREAKPOINT}px)`);
  menu = [
    { class: '', url: '', name: 'item 1' },
    { url: '', name: 'item 2' },
  ];

  constructor() { }

  ngOnInit() {
  }

  isHandset() {
    return this.mediaMatcher.matches;
  }

}
