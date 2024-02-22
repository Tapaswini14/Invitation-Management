import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopnavComponent } from './Dashboard/topnav/topnav.component';
import { HomeComponent } from './Dashboard/home/home.component';
import { BirthdayInvitationComponent } from './Cards/birthday-invitation/birthday-invitation.component';
import { BusinessOpeningComponent } from './Cards/business-opening/business-opening.component';
import { HouseWarmingComponent } from './Cards/house-warming/house-warming.component';
import { ThreadCeremonyComponent } from './Cards/thread-ceremony/thread-ceremony.component';
import { WeddingInvitationComponent } from './Cards/wedding-invitation/wedding-invitation.component';
import { MuslimWeddingInvitationComponent } from './Cards/muslim-wedding-invitation/muslim-wedding-invitation.component';
import { SubmitPageComponent } from './Cards/submit-page/submit-page.component';
import { HinduBrideWeddingComponent } from './Cards/hindu-bride-wedding/hindu-bride-wedding.component';
import { HinduGroomWeddingComponent } from './Cards/hindu-groom-wedding/hindu-groom-wedding.component';
import { MuslimBrideWeddingComponent } from './Cards/muslim-bride-wedding/muslim-bride-wedding.component';
import { MuslimGroomWeddingComponent } from './Cards/muslim-groom-wedding/muslim-groom-wedding.component';
import { ChristianWeddingInvitationComponent } from './Cards/christian-wedding-invitation/christian-wedding-invitation.component';
import { ChristianBrideInvitationComponent } from './Cards/christian-bride-invitation/christian-bride-invitation.component';
import { ChristianGroomInvitationComponent } from './Cards/christian-groom-invitation/christian-groom-invitation.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'birthday-invitation', component: BirthdayInvitationComponent },
  { path: 'business-opening', component: BusinessOpeningComponent },
  { path: 'wedding-invitation', component: WeddingInvitationComponent },
  {
    path: 'muslim-wedding-invitation',
    component: MuslimWeddingInvitationComponent,
  },
  {
    path: 'christian-bride-wedding',
    component: ChristianWeddingInvitationComponent,
  },
  { path: 'hindu-bride-wedding', component: HinduBrideWeddingComponent },
  { path: 'hindu-groom-wedding', component: HinduGroomWeddingComponent },
  { path: 'muslim-bride-wedding', component: MuslimBrideWeddingComponent },
  { path: 'muslim-groom-wedding', component: MuslimGroomWeddingComponent },
  {
    path: 'christian-bride-invitation',
    component: ChristianBrideInvitationComponent,
  },
  {
    path: 'christian-groom-invitation',
    component: ChristianGroomInvitationComponent,
  },
  { path: 'house-warming', component: HouseWarmingComponent },
  { path: 'thread-ceremony', component: ThreadCeremonyComponent },
  { path: 'submit-page', component: SubmitPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'topnav', component: TopnavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
