import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteService } from '../../providers/note-service/note-service';
import { Note } from '../../models/note.model';
import { EditNotePage } from '../edit-note/edit-note';

@IonicPage()
@Component({
  selector: 'page-view-note',
  templateUrl: 'view-note.html',
})
export class ViewNotePage {

  note: Note;

  constructor(public navCtrl: NavController, public navParams: NavParams, private noteService: NoteService) {
    this.note = this.navParams.get('note');
  }

  deleteNote(createdDate: number) {
    this.noteService.deleteNote(createdDate);
    this.navCtrl.pop();
  }

  editNote(note: Note) {
    this.navCtrl.push(EditNotePage, { note: note });
  }

}
