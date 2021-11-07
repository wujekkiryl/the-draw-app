import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Key } from 'ts-keycode-enum';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  persons: Array<string> = [];
  submitDisabled: boolean = true;

  formControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }

  addPerson(name: string) {
    if (name !== '') {
      this.persons.push(name);
      this.formControl.setValue('');
      if (this.persons.length > 1) {
        this.submitDisabled = false;
      }
    }
  }

  removePerson(index: number) {
    this.persons.splice(index, 1);
  }

  keydownFnc(e: KeyboardEvent) {
    if (e.keyCode === Key.Enter) {
      e.preventDefault();
      this.addPerson(this.formControl.value);
    }
  }
}
