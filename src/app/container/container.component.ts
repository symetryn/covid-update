import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Router, NavigationEnd } from "@angular/router";
import { GoogleTagManagerService } from "angular-google-tag-manager";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  casesArray: string[];
  activeArray: string[];
  deathArray: string[];
  numberArray: Array<string>;
  todayDeathArray: string[];
  todayCasesArray: string[];
  recoverArray: string[];

  selectedCountry: CountryData;

  allCountryData: Array<CountryData>;
  smallMode: boolean = false;

  constructor(
    public api: ApiService,
    public router: Router,
    private gtmService: GoogleTagManagerService
  ) {}

  ngOnInit(): void {
    // this.smallMode = true;
    this.api.getAllCountryData().subscribe((data) => {
      this.allCountryData = data;
      //default nepal
      this.selectedCountry = this.allCountryData.filter(
        (x) => x.country === "Nepal"
      )[0];

      this.handleCountryChange();
    });
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: "page",
          pageName: item.url,
        };
        this.gtmService.pushTag(gtmTag);
      }
    });
  }

  isNepal() {
    return this.selectedCountry.country == "Nepal";
  }

  getDigitArray(i: Number) {
    return (i + "").split("");
  }

  handleCountryChange() {
    //populate data
    this.handleDigitSize(this.selectedCountry.cases + "");
    this.casesArray = this.getDigitArray(this.selectedCountry.cases);
    this.activeArray = this.getDigitArray(this.selectedCountry.active);
    this.deathArray = this.getDigitArray(this.selectedCountry.deaths);
    this.todayCasesArray = this.getDigitArray(this.selectedCountry.todayCases);
    this.todayDeathArray = this.getDigitArray(this.selectedCountry.todayDeaths);
    this.recoverArray = this.getDigitArray(this.selectedCountry.recovered);
  }

  handleDigitSize(cases: string) {
    if (cases?.length > 4 && window.innerWidth < 768) {
      this.smallMode = true;
    } else {
      this.smallMode = false;
    }
  }
}

interface CountryData {
  country: string;
  countryInfo: {
    iso2: string;
    iso3: string;
    _id: number;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
}
