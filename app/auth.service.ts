import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"; // URL for user registration
  private _loginUrl = "http://localhost:3000/api/login"; // URL for user login

  constructor(private http: HttpClient, private _router: Router) { }

  // Send a POST request to register a new user
  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  // Send a POST request to authenticate and log in a user
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  // Logout the user by removing the token from local storage
  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/events']); // Navigate to the 'events' route after logout
  }

  // Get the authentication token from local storage
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if the user is logged in (based on token existence)
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
