import { Component, OnInit } from '@angular/core';

import { Ad } from '../ad';
import { AdsService } from '../ads.service';

@Component({
  selector: 'ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css'],
  providers:  [AdsService]
})
export class AdsListComponent  implements OnInit {
  errorMessage: string;
  ads: Ad[];
  mode = 'Observable';
  constructor (private adsService: AdsService) {}
  ngOnInit() { this.getAds(); }

  getAds() {
    this.adsService.getAds()
                     .subscribe(
                       ads => this.ads = ads,
                       error =>  this.errorMessage = <any>error);
  }
  addAd (name: string) {
    if (!name) { return; }
    /*this.adsService.addHero(name)
                     .subscribe(
                       hero  => this.heroes.push(hero),
                       error =>  this.errorMessage = <any>error);*/
  }

}
