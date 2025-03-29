import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

// Define the UserData interface to represent the structure of user data in the JWT.
class AuthService {
  getProfile() {
    // return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  // get the token from localStorage
  loggedIn() {
    const token = this.getToken();
    return !!token
  }
  
  // check if the token is expired
  isTokenExpired(token: string) {
    try {
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        // If the token is expired, return true indicating that it is expired.
        return true;
      }
      // If the token is not expired, return false.
    } catch (err) {
      return false;
    }
    // return a value that indicates if the token is expired
  }

  getToken(): string {
    //  return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }
// get the token from localStorage
  login(idToken: string) {
    // set the token to localStorage
    // redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // remove the token from localStorage
    // redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
