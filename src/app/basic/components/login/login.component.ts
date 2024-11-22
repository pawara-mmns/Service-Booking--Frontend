import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

validateForm!: FormGroup;

constructor(private fb: FormBuilder,
  private authService: AuthService,
  private notification: NzNotificationService,
  private router: Router,

    ){
  }
  ngOnInit(){
    this.validateForm = this.fb.group({
      userName : [null, [Validators.required]],
      password : [null, [Validators.required]],

    })
  }

  

  submitForm(){
    this.authService.login(this.validateForm.get(['userName'])!.value, this.validateForm.get(['password'])!.value)
    .subscribe(res =>{
        console.log(res)
        if(UserStorageService.isClientLoggedIn()){
          this.router.navigateByUrl('client/dashboard')
        }else{
          console.log("company");
          this.router.navigateByUrl('company/dashboard')
        }
    }, error =>{
      this.notification
      .error(
        'Error',
        `Bad Credentials`,
        { nzDuration: 5000}
      )
    })
  }
}
