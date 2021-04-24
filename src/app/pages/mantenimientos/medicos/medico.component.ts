import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { Hospital } from './../../../models/hospital.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  hospitalSelecionado: Hospital;
  medicoSeleccionado: Medico;

  constructor(private readonly fb: FormBuilder,
    private readonly hospitalService: HospitalService,
    private readonly medicoService: MedicoService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe(
      hospitalId => {
        this.hospitalSelecionado = this.hospitales.find(h => h._id === hospitalId)
      }
    )
    this.obtenerMedicoPorId();
  }

  obtenerMedicoPorId() {
    this.activatedRoute.params.subscribe(
      ({ id }) => this.cargarMedico(id)
    )
  }

  cargarMedico(id: string) {
    if( id === 'nuevo') {
      return
    }
    this.medicoService.obtenerMedicoPorId(id)
    .pipe(
      delay(50)
    )
    .subscribe(
      medico => {

        if(!medico) {
          this.router.navigateByUrl(`/dashboard/medicos`)
        }

        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      }
    )
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe(
      (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      }
    )
  }

  guardarMedico() {
    const data = {
      ...this.medicoForm.value,
      _id: this.medicoSeleccionado._id
    }

    const { nombre } = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      this.medicoService.actualizarMedicos(data).subscribe(
        () => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success')
        }
      )
    } else {
      this.medicoService.crearMedicos(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success')
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        });
    }


  }

}
