import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['victor', Validators.required],
    email: ['victor@test.com', [Validators.required, Validators.email]],
    password: ['1234', Validators.required],
    password2: ['1234', Validators.required],
    terminos: [true, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
    private readonly usuarioService: UsuarioService,
    private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return
    }

    // Postear formulario
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  validarCampo(campo): Boolean {
    return (this.registerForm.get(campo).invalid && this.formSubmitted) ? true : false;
  }

  validarContrasenas(): Boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    return ((pass1 !== pass2) && this.formSubmitted) ? true : false;
  }

  validarTerminos(): Boolean {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(passName1, passName2) {
    return (formGroup: FormGroup) => {
      const passControl1 = formGroup.get(passName1);
      const passControl2 = formGroup.get(passName2);

      if (passControl1.value === passControl2.value)
        passControl2.setErrors(null);
      else
        passControl2.setErrors({ noEsIgual: true });
    }
  }

}
