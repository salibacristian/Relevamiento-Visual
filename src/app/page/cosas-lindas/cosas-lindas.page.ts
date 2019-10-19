import { Component, OnInit } from '@angular/core';
import { FotosService, Foto } from 'src/app/services/foto.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  constructor(private subir:FotosService) { }
  arrayCosasLindas=[];

  ngOnInit() {
    this.ObtenerLindasDeBase();
  }

  private async ObtenerLindasDeBase() {
    var currentUserEmail = this.subir.getCurrentUser();
    this.subir.ObtenerFotos().subscribe(async (fotos) => {
      this.subir.ObtenerVotos().subscribe(async (votos) => {
        fotos.forEach(function (foto) {
          var votoDeLaFoto = votos.find(function (voto) {
            return voto.fotoId == foto.id;
          });
          var usuarios: Array<string> = JSON.parse(votoDeLaFoto.users);
          foto.votadaPorUsuario = usuarios.some(function (email) {
            return email == currentUserEmail;
          });
        });

        this.arrayCosasLindas = this.subir.FiltrarFotos(fotos, 'linda');
        this.OrderByDate();
      });
    });
  }

  private OrderByDate() {
    this.arrayCosasLindas= this.arrayCosasLindas.sort((a, b) => {
      return b.fecha.localeCompare(a.fecha);
    });
  }

  private Votar(foto: Foto) {

    this.subir.EditarFoto(foto);

}
}
