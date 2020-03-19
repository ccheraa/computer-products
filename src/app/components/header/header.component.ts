import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu = [
    {
      class: 'home',
      url: '/home',
      name: 'home'
    },
    {
      class: 'signup',
      url: '/api/signup',
      name: 'signup'
    },
    {
      class: 'signin',
      url: '/api/signin',
      name: 'signin'
    }
  ];

  menuAdmin = [
    {
      class: 'client',
      url: '/dashboard/client',
      name: 'client'
    },
    {
      class: 'invoice',
      url: '/dashboard/invoice',
      name: 'invoice'
    },
    {
      class: 'customer',
      url: '/dashboard/customer',
      name: 'customer'
    }
  ];

  constructor(
    private auth: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
  }

}
