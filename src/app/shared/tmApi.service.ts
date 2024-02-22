import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmApiService {
  constructor(private _http: HttpClient) {}
  baseUrl = 'https://tm.apptimates.com';
  // baseUrl = 'http://127.0.0.1:8000';

  getrituals(): Observable<any> {
    const enterUrl = `${this.baseUrl}/api/rituals`;
    return this._http.get(enterUrl);
  }

  // //Login Pharmacy
  // loginAdmin(data: any): Observable<any> {
  //   // console.log(data);
  //   const loginUrl = `${this.baseUrl}/api/login`;
  //   return this._http.post(loginUrl, data);
  // }

  // //LogOut Pharmacy
  // logout(bearerToken: string) {
  //   const headers = {
  //     Authorization: `Bearer ${bearerToken}`,
  //   };
  //   const logoutUrl = `${this.baseUrl}/api/logout`;
  //   return this._http.post(logoutUrl, {}, { headers });
  // }

  // Buisness Opening
  createBusinessInvitation(invitationData: any): Observable<any> {
    const businessUrl = `${this.baseUrl}/api/create-BusinessOpeningInvitation`;
    return this._http.post(businessUrl, invitationData);
  }

  registerOwner(invitationData: any): Observable<any> {
    const ownerUrl = `${this.baseUrl}/api/add-BusinessOpeningOwner`;
    return this._http.post(ownerUrl, invitationData);
  }

  createBusinessDetails(invitationData: any): Observable<any> {
    const businessUrl = `${this.baseUrl}/api/add-BusinessDetails`;
    return this._http.post(businessUrl, invitationData);
  }

  businessEventDetails(invitationData: any): Observable<any> {
    const eventUrl = `${this.baseUrl}/api/add-BusinessEventDetails`;
    return this._http.post(eventUrl, invitationData);
  }

  businessAdditional(invitationData: any): Observable<any> {
    const eventUrl = `${this.baseUrl}/api/add-AdditionalNotes`;
    return this._http.post(eventUrl, invitationData);
  }

  businessContactInfo(invitationData: any): Observable<any> {
    const eventUrl = `${this.baseUrl}/api/add-ContactInfo`;
    return this._http.post(eventUrl, invitationData);
  }

  businessSpecificInfo(invitationData: any): Observable<any> {
    const eventUrl = `${this.baseUrl}/api/add-OtherRequest`;
    return this._http.post(eventUrl, invitationData);
  }

  // Birthday Invitation

  createbirthdayInvitation(invitationData: any): Observable<any> {
    const loginUrl = `${this.baseUrl}/api/create-birthdayInvitation`;
    return this._http.post(loginUrl, invitationData);
  }

  addBirthdayDetails(invitationData: any): Observable<any> {
    const loginUrl = `${this.baseUrl}/api/add-BirthdayDetails`;
    return this._http.post(loginUrl, invitationData);
  }

  addParentDetails(invitationData: any): Observable<any> {
    const loginUrl = `${this.baseUrl}/api/add-ParentDetails`;
    return this._http.post(loginUrl, invitationData);
  }

  eventDetails(invitationData: any): Observable<any> {
    const eventUrl = `${this.baseUrl}/api/add-BirthdayEventDetails`;
    return this._http.post(eventUrl, invitationData);
  }

  additionalNotes(invitationData: any): Observable<any> {
    const eventUrl = `${this.baseUrl}/api/add-AdditionalNotes`;
    return this._http.post(eventUrl, invitationData);
  }

  contactInfo(invitationData: any): Observable<any> {
    const eventUrl = `${this.baseUrl}/api/add-ContactInfo`;
    return this._http.post(eventUrl, invitationData);
  }

  birthdaySpecificInfo(invitationData: any): Observable<any> {
    const eventUrl = `${this.baseUrl}/api/add-OtherRequest`;
    return this._http.post(eventUrl, invitationData);
  }

  //Thread Ceremony

  createThreadCeremonyInvitation(invitationData: any) {
    const eventUrl = `${this.baseUrl}/api/create-ThreadCeremonyInvitation`;
    return this._http.post(eventUrl, invitationData);
  }
  addThreadCeremonyCelebrant(invitationData: any) {
    const eventUrl = `${this.baseUrl}/api/add-ThreadCeremonyCelebrant`;
    return this._http.post(eventUrl, invitationData);
  }

  addThreadCeremonyEventDetails(invitationData: any) {
    const eventUrl = `${this.baseUrl}/api/add-ThreadCeremonyEventDetails`;
    return this._http.post(eventUrl, invitationData);
  }

  //Hindu-Wedding

  createWeddingInvitation(invitationData: any): Observable<any> {
    const businessUrl = `${this.baseUrl}/api/create-weddingInvitation`;
    return this._http.post(businessUrl, invitationData);
  }

  createBrideDetails(invitationData: any): Observable<any> {
    const businessUrl = `${this.baseUrl}/api/add-BrideDetails`;
    return this._http.post(businessUrl, invitationData);
  }

  createGroomDetails(invitationData: any): Observable<any> {
    const businessUrl = `${this.baseUrl}/api/add-GroomDetails`;
    return this._http.post(businessUrl, invitationData);
  }

  createWeddingDetails(invitationData: any): Observable<any> {
    const businessUrl = `${this.baseUrl}/api/add-InvitationDetails`;
    return this._http.post(businessUrl, invitationData);
  }

  //House Warming

  createhouseWarmingInvitation(invitationData: any) {
    const eventUrl = `${this.baseUrl}/api/create-houseWarmingInvitation`;
    return this._http.post(eventUrl, invitationData);
  }

  addHouseWarmingDetails(invitationData: any) {
    const eventUrl = `${this.baseUrl}/api/add-HouseWarmingDetails`;
    return this._http.post(eventUrl, invitationData);
  }

  addHouseWarmingEventDetails(invitationData: any) {
    const eventUrl = `${this.baseUrl}/api/add-HouseWarmingEventDetails`;
    return this._http.post(eventUrl, invitationData);
  }
  ritual_image_upload(invitationData: any) {
    const eventUrl = `${this.baseUrl}/api/ritual_image_upload`;
    return this._http.post(eventUrl, invitationData);
  }
}
