import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { Hospital } from './../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  constructor(private readonly http: HttpClient) { }

  cargarMedicos() {
    return this.http.get(`${base_url}/medicos`, this.headers)
    .pipe(
      map( (resp: {ok: boolean, medicos: Medico[]}) => resp.medicos)
    );
  }

  crearMedicos(medico: {nombre: string, Hospital: string}) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }

  actualizarMedicos(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  eliminarMedicos(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }

  obtenerMedicoPorId(id: string){
    return this.http.get(`${base_url}/medicos/${id}`, this.headers)
    .pipe(
      map( (resp: {ok: boolean, medico: Medico}) => resp.medico)
    );
  }

}
