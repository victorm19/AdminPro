import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(  private readonly usuarioService: UsuarioService ) { }

  logout() {
    this.usuarioService.logout();
  }

}
