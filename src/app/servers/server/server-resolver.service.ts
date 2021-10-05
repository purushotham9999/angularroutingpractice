import { ServersService } from "./../servers.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveData,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Server } from "../server";

@Injectable({
  providedIn: "root",
})
export class ServerResolverService implements Resolve<Server> {
  constructor(private serversService: ServersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Server | Observable<Server> | Promise<Server> {
    // throw new Error('Method not implemented.');
    return this.serversService.getServer(+route.params["id"]);
  }
}
