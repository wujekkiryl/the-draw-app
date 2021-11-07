import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { CreateRoomResponse } from 'src/app/interfaces/createRoom.interface';
import { RoomService } from 'src/app/services/room.service.service';
import { Key } from 'ts-keycode-enum';

@Component({
  selector: 'app-create-room.dialog',
  templateUrl: './create-room.dialog.component.html',
  styleUrls: ['./create-room.dialog.component.scss']
})
export class CreateRoomDialogComponent implements OnInit {

  formControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private roomService: RoomService,
    private router: Router,
    private dialogRef: MatDialogRef<CreateRoomDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  keydownFnc(e: KeyboardEvent) {
    if (e.keyCode === Key.Enter) {
      e.preventDefault();
      this.confirmRoomCreation();
    }
  }

  confirmRoomCreation() {
    this.roomService.createRoom(this.formControl.value)
    .pipe(catchError((error: any) => {
      console.error(error);
      return error;
    }))
    .subscribe((response: any | CreateRoomResponse) => {
      if (response.code === 200) {
        this.router.navigate(['create-room', response.data.roomId], {})
      }
      this.dialogRef.close();
    })
  }

}
