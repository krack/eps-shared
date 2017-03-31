import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import { Ad } from '../model/ad';
import { AdsService } from '../ads.service';

@Component({
  selector: 'ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss'],
  providers:  [AdsService]
})
export class AdsListComponent  implements OnInit {
  errorMessage: string;
  ads: Ad[];
  mode = 'Observable';
  constructor (private adsService: AdsService, private domSanitizer:DomSanitizer) {}
  ngOnInit() { this.getAds(); }

  getAds() {
    this.adsService.getAds()
                     .subscribe(
                       ads => this.ads = ads,
                       error =>  this.errorMessage = <any>error);
  }

  deleteAd(event, ad:Ad) {
    this.adsService.deleteAd(ad._id)
                     .subscribe(
                       result => this.ads = this.ads.filter(el => el._id != ad._id),
                       error =>  this.errorMessage = <any>error);
    event.preventDefault();
  }

    photoURL(url) {
      return this.domSanitizer.bypassSecurityTrustUrl(url);
    }



}
