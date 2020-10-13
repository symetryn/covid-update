import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

declare var gtag: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  affected = 10000;
  title = "Corona Tracker";

  constructor(router: Router) {
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        gtag("config", "UA-180494306-1", {
          page_path: evt.urlAfterRedirects,
        });
      }
    });
  }
}
