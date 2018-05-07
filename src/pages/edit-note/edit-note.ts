import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validator, FormControl } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NoteService } from '../../providers/note-service/note-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {

  formGroup: FormGroup;
  note: Note;
  date: Date = new Date();
  title: string = '';
  content: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private noteService: NoteService) {
    this.note = this.navParams.get('note');

    this.formGroup = new FormGroup({
      title: new FormControl(this.note.title),
      content: new FormControl(this.note.content),
      date: new FormControl(this.note.date),
    });
  }

  saveNote(note: Note) {
    note.createDate = this.note.createDate;
    this.noteService.updateNote(note);
    this.navCtrl.popToRoot();
  }

}
