import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'eCommerce-test-ui';

  adminFlag: boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.initFromStorage();
  }
}
