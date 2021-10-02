import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ServersService } from "./servers.service";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.css"],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // relativepath
    //will lead to " Error: Cannot match any routes. URL Segment: 'servers/servers'"
    // this.router.navigate(["servers"], { relativeTo: this.activeRoute });
    //absolute path
    // this.router.navigate(["/servers"], { relativeTo: this.activeRoute });
  }
}
