import { Component, OnInit } from '@angular/core';
import { FotosService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {
  constructor(private subir:FotosService) { }
  arrayCosasLindas=[];

  ngOnInit() {
    this.ObtenerLindasDeBase();
  }

  private async ObtenerLindasDeBase() {

    this.subir.ObtenerFotos().subscribe(async (fotos) => {
      this.arrayCosasLindas = this.subir.FiltrarFotos(fotos, 'fea');
      console.log(this.arrayCosasLindas);
      this.OrderByDate();
      // this.arrayCosasLindas= this.arrayCosasLindas.reverse();
      console.log(this.arrayCosasLindas);
    });
    
  }


  private OrderByDate() {
    this.arrayCosasLindas= this.arrayCosasLindas.sort((a, b) => {
      return b.fecha.localeCompare(a.fecha);
    });
  }
}
