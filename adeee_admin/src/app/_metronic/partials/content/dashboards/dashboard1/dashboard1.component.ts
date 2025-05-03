import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';
import { AuthService } from '../../../../../modules/auth/_services/auth.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
})
export class Dashboard1Component implements OnInit {
  user$: any = null;
  constructor(private auth: AuthService) {
    this.user$ = this.auth.user;
    console.log(this.user$)
  }

  ngOnInit(): void {}
}
