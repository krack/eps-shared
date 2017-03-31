import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';



import { Ad } from '../model/ad';
import { AdsService } from '../ads.service';
import { FileUploader, FileSelectDirective} from 'ng2-file-upload'

import {environment} from '../../environments/environment';

const URL =  environment.apiUrl+'articles/';

@Component({
	moduleId: module.id,
	selector: 'ads-form',
	templateUrl: './ads-form-component.component.html',
	styleUrls: ['./ads-form-component.component.scss'],
	providers: [AdsService, FileSelectDirective],

})
export class AdsFormComponentComponent implements OnInit {
	public uploader:FileUploader;
	url:String;
	errorMessage: string;
	model = new Ad();

	submitted = false;

	constructor( private router: Router, private route: ActivatedRoute, private adsService: AdsService, private domSanitizer:DomSanitizer) { }

	ngOnInit() {
		this.route.params
		// (+) converts string 'id' to a number
		.subscribe((params: Params) => {
			let id = params['id']
			if(id){
				this.uploader = new FileUploader({
					url: URL+id+"/images/"
				});
				this.adsService.getAd(id)
				.subscribe((ad: Ad) => this.model = ad);
			}else{
				this.uploader = new FileUploader({
					url: URL+"/images/"
				});
			}
		});
	}

	public hasBaseDropZoneOver:boolean = false;

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}


	createAd() {
		if(this.model._id){
			console.log(this.model);
			this.adsService.updateAd(this.model)
			.subscribe(
			ad => console.log("ok"),
			error => this.errorMessage = <any>error);
		}else {
			console.log("add");

			console.log(this.model);
			this.adsService.addAd(this.model)
				.subscribe(
				ad => this.router.navigate(['/ads']),
				error => this.errorMessage = <any>error);
		}
	}
	photoURL(url) {
      return this.domSanitizer.bypassSecurityTrustUrl(url);
    }
}
