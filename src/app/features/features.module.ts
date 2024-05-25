import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavVarComponent } from './nav-var/nav-var.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NavVarComponent, ChatComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports: [NavVarComponent, ChatComponent],
})
export class FeaturesModule {}
