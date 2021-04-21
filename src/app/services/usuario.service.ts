import { CaegarUsuarios } from './../interfaces/cargar-usuarios.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private readonly http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  async googleInit() {
    await gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '1077150573267-s7osut6hmah1ktngnqirnlfg2cf98shk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, nombre, role, img = '', uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', google, img, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarUsuario(formData: { email: string; nombre: string; role: string }) {
    formData = {
      ...formData,
      role: this.usuario.role,
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`, formData, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    return this.http
      .get<CaegarUsuarios>(`${base_url}/usuarios?desde=${desde}`, this.headers)
      .pipe(
        map((resp) => {
          const usuarios = resp.usuarios.map(
            (user) => new Usuario(user.nombre, user.email, '', user.google, user.img, user.role, user.uid)
          );
          return {
            total: resp.total,
            usuarios
          }
        })
      );
  }

  eliminarUsuario(id: string) {
    const url = `${base_url}/usuarios/${id}`;
    return this.http.delete(url, this.headers);
  }

  cambiarRoleUser(usuario: Usuario) {
    return this.http.put(`${base_url}/usuarios/${this.usuario.uid}`, usuario, this.headers);
  }
}
