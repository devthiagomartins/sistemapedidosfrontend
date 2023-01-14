import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder, 
              public cidadeService: CidadeService, 
              public estadoService: EstadoService) {

            
    this.formGroup = this.formBuilder.group({
      nome: ['ThiagoRemover',[Validators.required,
                 Validators.minLength(3), 
                 Validators.maxLength(120)]],

      email: ['thiagoremover@gmail.com',[Validators.required, 
                  Validators.email]],

      tipo: ['1',[Validators.required]],

      cpfOuCnpj : ['75719126104',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],

      senha : ['123',[Validators.required]],

      logradouro : ['rua 10',[Validators.required]],

      numero : ['1',[Validators.required]],

      complemento : ['teste',[]],

      bairro : ['celina',[]],

      cep : ['74373190',[Validators.required]],

      telefone1 : ['982352479',[Validators.required]],

      telefone2 : ['',[]],

      telefone3 : ['',[]],

      estadoId : [null,[Validators.required]],

      cidadeId : [null,[Validators.required]],
      
    });
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
      
    }, error => {});
  }
  signupUser() {
    console.log('enviou o form');
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => {});
  }
}
