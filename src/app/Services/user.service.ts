import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private client: HttpClient) {}

  UPLOAD_IMAGE(body: any) {
    return this.client.post('http://localhost:4000/api/v1/gallery', body);
  }

  GET_ALL_USERS() {
    return this.client.get('http://localhost:4000/api/v1/gallery');
  }

  DELETE_IMAGE(body: any) {
    console.log(body)
    return this.client.put('http://localhost:4000/api/v1/gallery',body);
  }
}
