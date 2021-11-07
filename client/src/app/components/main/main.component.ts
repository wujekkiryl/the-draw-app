import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomDialogComponent } from 'src/app/layout-components/dialogs/create-room.dialog/create-room.dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openCreateRoomDialog() {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent,{
      width: '600px'
    })
    
    dialogRef.afterClosed().subscribe((roomId: string) => {
      console.log(roomId);
    })
  }

}
