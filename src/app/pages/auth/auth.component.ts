import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { firstValueFrom } from 'rxjs'
import { HttpService } from '../../service/http.service'
import { EncryptionService } from '../../service/encryption.service'
import { LocalStorageService } from '../../service/local-storage.service'
import { NotificationService } from '../../service/notification.service'
import { environment } from '../../../environments/environment';
import { BussineDTO } from '../../models/bussineDTO'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {
  public authForm: FormGroup
  public submitted: boolean = false
  public bussinesList: BussineDTO[]
  public captchaResponse: string | undefined;
  public captchaError: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: HttpService,
    private encryptionService: EncryptionService,
    private localService: LocalStorageService,
    private notificationService: NotificationService,
  ) { }

  ngAfterViewInit(): void { }

  ngOnInit(): void {
    this.init()
  }

  private init(): void {
    this.createAuthFormBuilder()
    this.BussineUpdateValidity()
    this.GetBussines()
    setTimeout(() => {
      document.getElementsByTagName("iframe")[0]?.setAttribute("width", "500")
      document.getElementsByTagName("iframe")[0]?.setAttribute("height", "110")
    }, 2000);

  }

  get HaveBussines():boolean {
    return this.bussinesList?.length > 1
  }

  get HaveSetBussine(): boolean {
    return this.localService.LocalGet(environment.KeyNit) != null
  }

  private createAuthFormBuilder(): void {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bussines: ['', ],
    })
  }

  private BussineUpdateValidity():void {
    if(this.HaveBussines)
      this.authForm.get('bussines')?.setValidators(Validators.required)
    else this.authForm.get('bussines')?.clearValidators()
      this.authForm.get('bussines')?.updateValueAndValidity()
  }

  private GetBussines(): void {
    this.route.data.subscribe((data: any) => {
      this.bussinesList = data?.bussinesData

      if(!this.HaveBussines) this.localService.LocalSet(environment.KeyNit, this.bussinesList[0].nit)

    })
  }

  private async OAuth<T>(): Promise<T> {
    return new Promise((resolve, _) => {
      this.service.HttpPost("Auth/Authentication",{
        ...this.authForm.value, password: this.encryptionService.encrypt(this.authForm.value.password)
      }).subscribe((response: any) => {
        resolve(response)
      })
    })
  }

  public resolveCaptcha(captchaResponse: string | any):void {
    this.captchaResponse = captchaResponse
  }

  public onSelectBussine(nit: any): void {
    this.localService.LocalSet(environment.KeyNit, nit)
  }

  public async onSubmit(): Promise<void> {
    if (!this.authForm.valid || !this.captchaResponse)
      return this.notificationService.error("Debe de completar todo el formulario para poder intentar iniciar sesión.")

    const params = await firstValueFrom(this.route.queryParams);
    const response = await this.OAuth<any>();

    this.route.paramMap.subscribe(params => {
      window.location.href = `http://${this.localService.GetTenant()}.${params.get(environment.Redirect)}?token=${response.token}`;
    })

  }
}
