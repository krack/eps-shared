import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Ad } from '../ad';
import { AdsService } from '../ads.service';

@Component({
	moduleId: module.id,
	selector: 'ads-form',
	templateUrl: './ads-form-component.component.html',
	styleUrls: ['./ads-form-component.component.css'],
	providers: [AdsService]
})
export class AdsFormComponentComponent implements OnInit {

	errorMessage: string;
	model = new Ad();

	submitted = false;

	constructor( private router: Router, private adsService: AdsService) { }

	ngOnInit() {
	}



	createAd() {
		this.adsService.addAd(this.model)
			.subscribe(
			ad => this.router.navigate(['/ads']),
			error => this.errorMessage = <any>error);
	}

	// TODO: Remove this when we're done
	get diagnostic() { return JSON.stringify(this.model); }
}
