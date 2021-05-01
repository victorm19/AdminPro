import { BusquedasService } from './../../../services/busquedas.service';
import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private readonly usuarioServices: UsuarioService,
    private readonly busquedasServices: BusquedasService,
    private readonly modalImagenService: ModalImagenService
  ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.$nuevaImagen.subscribe( () => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioServices
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasServices.buscar('usuarios', termino)
      .subscribe(resp => {
        this.usuarios = resp;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    if(usuario.uid === this.usuarioServices.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar al usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServices.eliminarUsuario(usuario.uid)
          .subscribe(
            () => {
              this.cargarUsuarios();
              Swal.fire('Usuario borrado', `${usuario.nombre} fue eliminado correctamente`, 'success');
            } 
          )
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioServices.cambiarRoleUser(usuario).subscribe();
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
