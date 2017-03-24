import { Contact } from './contact';
export class Ad {
	public contact: Contact;

	constructor(public _id?: String, public title?: String, public describe?: String){
		this.contact= new Contact();
	}

}
