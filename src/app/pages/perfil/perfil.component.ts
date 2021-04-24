import Swal from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private readonly usuarioService: UsuarioService,
    private readonly fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService
      .actualizarUsuario(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Los cambios fueron guardados', 'success')
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      });
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) { 
      return this.imgTemp = null;
    };

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then( img => { 
      this.usuario.img = img
      Swal.fire('Guardado', 'La imagen se guardo exitósamente', 'success')
    }).catch(err => {
      Swal.fire('Error', 'No se pudo cargar la imagen', 'error')
    })
  }
}
