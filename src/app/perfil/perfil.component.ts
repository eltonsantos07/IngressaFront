import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  nome = environment.nome
  foto = environment.fotoPerfil
  
  validacaoSenha: string;
  tipoDeUsuario: boolean;
  consultaClickAdmin: number = 0;
  codigoAdminDigitado: string;
  verificaEmpresaAtual: boolean;


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)
    
    if(environment.token == ''){
        this.alertas.showAlertInfo('Sessão expirada, faça login novamente')
        this.router.navigate(['/entrar'])
    }

      this.usuario.usuarioAdmin = false;
      this.idUsuario = this.route.snapshot.params['id']
      this.findByIdUsuario(this.idUsuario)
  }

  //Validações dos campos de cadastro

  validandoNome(){

    const validaNome = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/

    let nome = document.querySelector("#nome");

    let nomeValue = (<HTMLInputElement>document.querySelector("#nome")).value.length;

    if (validaNome.test(this.usuario.nome)) {

      nome.setAttribute('style', 'border-color:#9794F2');
    }
    else if (nomeValue == 0) {
      nome.setAttribute('style', 'border-color:#9794F2');
    }
    else {

      nome.setAttribute('style', 'border-color:#e84c3d');
    }


  }

  validandoEmail() {

    const validaEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

    let email = document.querySelector("#email");

    let emailValue = (<HTMLInputElement>document.querySelector("#email")).value.length;

    if (validaEmail.test(this.usuario.email)) {

      email.setAttribute('style', 'border-color:#9794F2');
    }
    else if (emailValue == 0) {
      email.setAttribute('style', 'border-color:#9794F2');
    }
    else {

      email.setAttribute('style', 'border-color:#e84c3d');
    }

  }

  validandoSenha() {

    let senha = document.querySelector("#senha");

    let senhaValue = (<HTMLInputElement>document.querySelector("#senha")).value.length;

    const validaSenha = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (validaSenha.test(this.validacaoSenha)) {

      senha.setAttribute('style', 'border-color:#9794F2');
    }
    else if (senhaValue == 0) {
      senha.setAttribute('style', 'border-color:#9794F2');
    }
    else {

      senha.setAttribute('style', 'border-color:#e84c3d');
    }

  }

  verificandoSenhas() {

    let senhaConfirm = document.querySelector("#confirmSenha");

    let confirmSenhaValue = (<HTMLInputElement>document.querySelector("#confirmSenha")).value.length;

    if (this.usuario.senha != this.validacaoSenha) {

      senhaConfirm.setAttribute('style', 'border-color:#e84c3d');

    }
    else if (confirmSenhaValue == 0) {
      senhaConfirm.setAttribute('style', 'border-color:#9794F2');
    }
    else {
      senhaConfirm.setAttribute('style', 'border-color:#9794F2');
    }

  }

  confirmSenha(event: any) {

    this.validacaoSenha = event.target.value;

  }

  validandoTel() {

    const regex = /^\s*(\d{2})[-. ]?(\d{5})[-. ]?(\d{4})\s*$/gm

    let tel = document.querySelector("#phone");

    let telValue = (<HTMLInputElement>document.querySelector("#phone")).value.length;

    if (regex.test(this.usuario.telefone)) {

      tel.setAttribute('style', 'border-color:#9794F2');
    }
    else if (telValue == 0) {
      tel.setAttribute('style', 'border-color:#9794F2');
    }
    else {

      tel.setAttribute('style', 'border-color:#e84c3d');
    }

  }

  validaFoto(){

    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

    let foto = document.querySelector("#linkFoto");

    let fotoValue = (<HTMLInputElement>document.querySelector("#linkFoto")).value.length;

    if (regex.test(this.usuario.fotoPerfil)) {

      foto.setAttribute('style', 'border-color:#9794F2');
    }
    else if (fotoValue == 0) {
      foto.setAttribute('style', 'border-color:#9794F2');
    }
    else {

      foto.setAttribute('style', 'border-color:#e84c3d');
    }

  }

  dataNascimento() {

    let data = document.querySelector("#dataNascimento");

    data.setAttribute('type', 'date');

  }

  exibeAdmin() {

    let admin = document.querySelector("#admin");

    if (this.consultaClickAdmin == 0) {
      this.consultaClickAdmin = 1;
      admin.setAttribute('style', 'display:inline');
    }
    else {
      this.consultaClickAdmin = 0;
      admin.setAttribute('style', 'display:none');
    }
  }

  verificandoAdmin(event: any) {

    this.codigoAdminDigitado = event.target.value

    if (this.codigoAdminDigitado != 'devIngressa') {
      this.usuario.usuarioAdmin = false;

    }
    else {
      this.usuario.usuarioAdmin = true;
    }

  }


  tipoUsuario(event: any) {

    let inserirEmpresa = document.querySelector("#empresaAtual");


    if (event.target.value == 'valor2') {
      this.tipoDeUsuario = false
      inserirEmpresa.setAttribute('style', 'display: none')
      this.usuario.empresaAtual = null
    }
    else if (event.target.value == 'valor3') {
      this.tipoDeUsuario = true;
      inserirEmpresa.setAttribute('style', 'display: inline')
    }
    else {
      this.tipoDeUsuario = false;
      inserirEmpresa.setAttribute('style', 'display: none')
      this.usuario.empresaAtual = null
    }


  }

  empresaAtual(event: any) {

    if (this.tipoDeUsuario == true) {
      this.usuario.empresaAtual = event.target.value
    }
    else {
      this.usuario.empresaAtual = null;
    }

  }

  verificaFoto() {

    let foto;

    const verificador = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

    // if(environment.fotoPerfil.match(verificador)){

    if (verificador.test(environment.fotoPerfil)) {

      foto = environment.fotoPerfil

    }
    else {

      foto = "../assets/unnamed.png"
    }

    return foto;

  }

  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

  atualizar(){

    
    this.usuario.usuarioEmpregador = this.tipoDeUsuario

    if (this.usuario.usuarioEmpregador == null) {
      this.alertas.showAlertDanger('Escolha uma das opções')
    }

    if (this.usuario.senha != this.validacaoSenha) {
      this.alertas.showAlertDanger('Senhas diferentes')


    }
    else {

      if(this.usuario.email == ''){
        this.usuario.email = null;
      } 

      console.log(this.usuario.email)

      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;

        //this.router.navigate(['/inicio'])

        this.alertas.showAlertSuccess('Usuário atualizar com sucesso! Faça login novamente.')
        environment.id = 0
        environment.nome = ''
        environment.token = ''
        environment.usuarioEmpregador = false,
        environment.fotoPerfil = ''
        this.router.navigate(['/entrar'])

      }, erro => {
        if (erro.status == 400, erro.status == 500) {
          this.alertas.showAlertDanger('Informações inválidas')
        }
      })
    }
  }


}
