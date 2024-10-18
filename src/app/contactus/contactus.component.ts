import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  contactusForm =new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(),
    phone:new FormControl(null,[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    message:new FormControl(null,[Validators.required,Validators.minLength(3)])
  });
  contactus(x:any){
    console.log(x)
  }
  showAlert (){
    Swal.fire({
      title: 'Your message has been sent!',
      text: 'Thank you for contacting us. We will get back to you shortly.',
      icon: 'success',
      timer: 3000,
      confirmButtonText: 'OK',
      customClass: {
        title: 'custom-title',
      }
    });
  }
}
