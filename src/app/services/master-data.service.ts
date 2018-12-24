import { Injectable } from '@angular/core';

@Injectable()
export class MasterDataService {

  constructor() { }
  getCountries() {
  	return [
  		{id: '-1', name: 'Please Select'},
  		{id: '1', name: 'USA'},
  		{id: '2', name: 'India'},
  		{id: '3', name: 'Australia'},
  	];
  }
  getStates() {
  	return [
  		{id: '-1', cid: '-1', name: 'Please Select'},
  		{id: '1', cid: '1', name: 'Arizona'},
  		{id: '2', cid: '1', name: 'Alaska'},
  		{id: '3', cid: '1', name: 'Florida'},
  		{id: '4', cid: '1', name: 'Hawaii'},
  		{id: '5', cid: '2', name: 'Gujarat'},
  		{id: '6', cid: '2', name: 'Goa'},
  		{id: '7', cid: '2', name: 'Punjab'},
  		{id: '8', cid: '3', name: 'Queensland'},
  		{id: '9', cid: '3', name: 'South Australia'},
  		{id: '10', cid: '3', name: 'Tasmania'},
  	];
  }
  getPowers(){
    return ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  }
}
