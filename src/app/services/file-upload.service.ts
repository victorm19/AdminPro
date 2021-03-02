import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File, 
    tipo: 'usuarios' | 'medicos' | 'hopitales',
    id: string
    ){
    try {
      const url = `${baseUrl}/upload/${tipo}/${id}`
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.ok) {
        return data.nombreArchivo;
      } else {
        console.log(data.msg)
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
