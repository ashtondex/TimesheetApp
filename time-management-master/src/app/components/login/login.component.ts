import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeSimple } from '../../models/employee-simple.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,private service: UserService) {}
    user: EmployeeSimple
  ngOnInit() {
    this.setForm(null);
   
  }

  

  setForm(ts: any) {
    this.loginForm = this.fb.group({

      Username: null,
      Password: null
    });
    /*if (ts !== null) {
      this.charactersLeft = this.charactersLeft - ts.Description.length;
    }*/
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.service.login(this.loginForm.get('Username').value, this.loginForm.get('Password').value);
    this.user = this.service.getUser();
    if (this.user && this.user.UserId > 0)
    {
      // success
      this.router.navigate(["/timesheet"]);
    }
    
  }
//);
}

