import { Component, OnInit } from '@angular/core';
import { TesteService } from './teste.services';


@Component({
	selector: 'app-teste',
	templateUrl: './teste.component.html'
})
export class TesteComponent implements OnInit {

	ords :[{
		itcodigo: string,
		nrordprodu: string
	}]

  	constructor(private testeService: TesteService) { }

	ngOnInit() {
		this.testeService.getOrdens()
		.subscribe(ord => {
			console.log(ord)
			this.ords = ord.data.tt_empresa;
			console.log(this.ords)
		})
	}

}

