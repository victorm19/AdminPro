import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public ocultarModal: boolean = false;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService, 
              private readonly fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
    .then( img => { 
      this.modalImagenService.$nuevaImagen.emit(img);
      Swal.fire('Guardado', 'La imagen se guardo exitósamente', 'success');
      this.cerrarModal();
    }).catch(err => {
      Swal.fire('Error', 'No se pudo cargar la imagen', 'error');
    })
  }


}
