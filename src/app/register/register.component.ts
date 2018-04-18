import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any =  {};
//  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  constructor(private authservice: AuthService, private alterifyService: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authservice.registerUser(this.model).subscribe(() => {
      this.alterifyService.success('registration sucessful');
    }, error => {
      this.alterifyService.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
