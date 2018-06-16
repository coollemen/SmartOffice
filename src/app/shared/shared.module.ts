import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BmobService} from "./services/bmob.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BmobService],
  providers: [BmobService],
})
export class SharedModule { }
