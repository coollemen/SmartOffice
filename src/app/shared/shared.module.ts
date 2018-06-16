import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BmobService} from "./services/bmob.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [BmobService],
})
export class SharedModule { }
