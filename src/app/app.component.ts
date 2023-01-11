import { UserService } from './Services/user.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'jan9Frontend';

  phoneNo: any;
  image: any;
  submitButton: boolean = false;
  allUsers: any;

  constructor(private client: UserService, private route: Router) {}
  ngOnInit(): void {
    this.GETALLUSERS();
  }

  fileChoosen(event: any) {
    console.log(event.target.files[0]);
    this.image = event.target.files[0];
    this.submitButton = true;
  }

  submitPhoto() {
    let formData = new FormData();
    formData.append('photo', this.image);
    formData.append('phoneNo', this.phoneNo);
    console.log(formData);
    this.client.UPLOAD_IMAGE(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.image = '';
        this.GETALLUSERS();
      },
    });
  }

  GETALLUSERS() {
    this.client.GET_ALL_USERS().subscribe({
      next: (res: any) => {
        console.log('all Users :', res);
        this.allUsers = res.data;
      },
    });
  }

  VIEWIMAGE(img: any) {
    this.route.navigate(['http://localhost:4000/' + img]);
  }

  DELETEIMAGE(img: any, phoneNo: any) {
    let body = { phoneNo: phoneNo, img: img };
    console.log(body);
    this.client.DELETE_IMAGE(body).subscribe({
      next: (res: any) => {
        console.log(res);
        this.GETALLUSERS()
      },
    });
  }
}
