import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  meniItmes: any[]; 
  public usuario: Usuario

  constructor(private readonly sidebarService: SidebarService,
              private readonly usuarioService: UsuarioService) { 
    this.meniItmes = sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
