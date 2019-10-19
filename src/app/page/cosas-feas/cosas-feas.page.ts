import { Component, OnInit } from '@angular/core';
import { FotosService, Foto } from 'src/app/services/foto.service';
import { async } from 'q';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {
  constructor(private subir: FotosService) { }
  arrayCosasLindas = [];

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

        this.arrayCosasLindas = this.subir.FiltrarFotos(fotos, 'fea');
        this.OrderByDate();
      });
    });

  }


  private OrderByDate() {
    this.arrayCosasLindas = this.arrayCosasLindas.sort((a, b) => {
      return b.fecha.localeCompare(a.fecha);
    });
  }

  private Votar(foto: Foto) {

      this.subir.EditarFoto(foto);
  
  }

}
