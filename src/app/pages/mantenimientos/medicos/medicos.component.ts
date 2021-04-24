import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true; 
  private imgSubs: Subscription;

  constructor(private readonly medicosService: MedicoService,
              private readonly modalImagenService: ModalImagenService,
              private readonly busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.$nuevaImagen.subscribe(
      () => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos().subscribe(
      (resp: Medico[]) => {
        this.cargando = false;
        this.medicos = resp;
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {
    debugger
    if( termino.length === 0) {
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino)
      .subscribe( resp => {
        this.medicos = resp;
      })
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Esta a punto de borrar al médico ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.eliminarMedicos(medico._id)
          .subscribe(
            () => {
              this.cargarMedicos();
              Swal.fire('Médico borrado', `${medico.nombre} fue eliminado correctamente`, 'success');
            } 
          )
      }
    })
  }

}
