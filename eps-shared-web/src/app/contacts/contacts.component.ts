import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../model/contact';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  host: {
    '(document:keyup)': 'test($event)'
  }
})
export class ContactsComponent implements OnInit {
  @Input() contact: Contact;
  private visible:boolean;

  constructor() { 
  	this.visible = false;
  }

  ngOnInit() {
  }
  show(){
  	this.visible = true;
  }
  hide(){
  	this.visible = false;
  }
  test(){
  	this.hide();
  }
}
