import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  isLogin = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(val =>  this.isLogin = val);
    this.authService.updateUserState();
  }

}
