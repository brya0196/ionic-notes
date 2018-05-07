import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Note } from '../../models/note.model';
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';

@Injectable()
export class NoteService {

  private notes: Note[] = [];
  private note: Note;

  constructor(public storage: Storage) {}

  saveNote(note: Note) {
    note.createDate = Date.now();
    this.notes.push(note);
    this.storage.set('notes', this.notes)
  }

  getAllNotes() {
    return this.storage.get('notes').then( notes => {
      this.notes = notes == null ? [] : notes; 
      return[...this.notes];
    });
  }

  getNote(createDate: number) {
    return this.storage.get('notes').then(notes => {
      this.note = [...notes].find(r => r.createDate === createDate);
      return this.note;
    });
  }

  updateNote(note: Note) {
    this.notes = this.notes.filter(n => {
      
      if(n.createDate === note.createDate) {
        n.date = note.date != n.date ? note.date : n.date;
        n.title = note.title != n.title ? note.title : n.title;
        n.content = note.content != n.content ? note.content : n.content;
      }

      return n;
    });

    this.storage.set('notes', this.notes);
  }

  deleteNote(createDate: number) {
    this.notes = this.notes.filter(note => {
      return note.createDate !== createDate
    });

    this.storage.set('notes', this.notes);
  }

}
