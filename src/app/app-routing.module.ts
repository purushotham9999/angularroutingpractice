import { CanDeactivateGuard } from "./servers/edit-server/can-component-deactivate";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolverService } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }],
  },
  {
    path: "servers",
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [
      {
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolverService },
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // { path: "not-found", component: PageNotFoundComponent },
  // { path: "**", component: PageNotFoundComponent, pathMatch: "full" },
  // { path: "**", redirectTo: "/not-found" },
  // { path: "**", redirectTo: "/not-found", pathMatch: "full" },
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found duh!!" },
  },
  { path: "**", redirectTo: "/not-found" },
  // { path: "**", component: PageNotFoundComponent, pathMatch: "full" },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  // imports: [CommonModule, RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
