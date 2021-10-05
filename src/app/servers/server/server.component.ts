import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private activatedRouter: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    //normal
    // this.server = this.serversService.getServer(
    //   +this.activatedRouter.snapshot.params["id"]
    // );
    // Reactive subscription
    // this.activatedRouter.params.subscribe((params: Params) => {
    //   // this.server.id = params["id"];
    //   console.log("server params");
    //   console.log(params);
    //   this.server = this.serversService.getServer(+params["id"]);
    //   console.log(this.server.name);
    // });

    this.activatedRouter.data.subscribe((data: Data) => {
      this.server = data["server"];
    });
  }

  onEdit() {
    // this.route.navigate(["/servers", +this.server.id, "edit"]);
    this.route.navigate(["edit"], {
      relativeTo: this.activatedRouter,
      queryParamsHandling: "preserve",
    });
  }
}
