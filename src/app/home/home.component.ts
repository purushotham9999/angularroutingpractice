import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthServiceService } from "../auth-service.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {}

  onLoadServers(id: number) {
    this.router.navigate(["/servers", id, "edit"], {
      queryParams: { allowEditxyx: "1" },
      fragment: "loading duh",
    });
  }
  onLogin() {
    this.authService.login();
  }

  onLougout() {
    this.authService.logout();
  }
}
