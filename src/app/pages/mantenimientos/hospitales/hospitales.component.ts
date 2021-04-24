import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = false;
  private imgSubs: Subscription;

  constructor(private readonly hospitalService: HospitalService,
              private readonly modalImagenService: ModalImagenService,
              private readonly busquedaService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.$nuevaImagen.subscribe(
      () => this.cargarHospitales()
    )
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe(
      resp => {
        this.hospitales = resp;
        this.cargando = false;
      }
    )
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe(
      resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      }
    );
  }

  eliminarHospital(hospital: Hospital) {
    this.hospitalService.eliminarHospital(hospital._id).subscribe(
      () => {
        this.cargarHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      }
    );
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del hospital'
    })

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe(
        (resp: { hospital: Hospital }) => {
          Swal.fire('Guardado', value, 'success');
          this.hospitales.push(resp.hospital)
        }
      )
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string) {
    debugger
    if( termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', termino)
      .subscribe( resp => {
        this.hospitales = resp;
      })
  }

}
