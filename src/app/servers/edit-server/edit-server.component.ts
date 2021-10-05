import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs";

import { ServersService } from "../servers.service";
import { CanComponentDeactivate } from "./can-component-deactivate";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.activeRoute.snapshot.queryParams);
    console.log(this.activeRoute.snapshot.fragment);
    this.activeRoute.queryParams.subscribe((queryParams: Params) => {
      console.log("subscribed queryParams");
      console.log(queryParams);
      this.allowEdit = queryParams["allowEdit"] === "1" ? true : false;
    });
    let id = 1;
    this.activeRoute.params.subscribe((params: Params) => {
      console.log("subscribed Params");
      console.log(params);
      // this.server = { id: +params["id"], name: "diej", status: "ss" };
      // this.server = this.serversService.getServer(+params["id"]);
      // this.server = this.serversService.getServer(this.server.id);
      id = params["id"];
    });
    this.activeRoute.fragment.subscribe((fragment) => {
      console.log("subscribed fragment");
      console.log(fragment);
    });
    this.server = this.serversService.getServer(+id);
    id = +this.activeRoute.snapshot.params["id"];
    // this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.activeRoute });
  }
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm("Do you want to discard the changes?");
    } else {
      return true;
    }
  }
}
