import {useState, useEffect} from 'react';
import {useStorage} from '@ionic/react-hooks/storage';
import {isPlatform} from '@ionic/react';

export interface NoteProps {
  id: string;
  title: string;
  description: string;
  date: string;
}

const NOTES = 'notes';

export function useNote() {
  const {get, set} = useStorage();

  const [notes, setNotes] = useState<NoteProps[]>([]);

  const saveNote = async (data: NoteProps) => {
    const newNotes = [data, ...notes];
    setNotes(newNotes);
    set(NOTES, JSON.stringify(newNotes));
  };

  const deleteNote = async (data: NoteProps) => {
    const newNotes = notes.filter((n) => n.id !== data.id);
    set(NOTES, JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const loadSaved = async () => {
    let result = [];
    const noteString = await get(NOTES);
    const allNote = (noteString ? JSON.parse(noteString) : []) as NoteProps[];
    if (!isPlatform('hybrid')) {
      for (let note of allNote) result.push(note);
      setNotes(result);
    }
  };

  const loadByID = async (id: string) => {
    let result = {};
    const noteString = await get(NOTES);
    const allNote = (noteString ? JSON.parse(noteString) : []) as NoteProps[];
    for (let note of allNote) {
      if (note.id === id) {
        result = note;
      }
    }
    return result;
  };

  const editNote = async (data: NoteProps) => {
    let newNotes = notes;
    for (let i in newNotes) {
      if (newNotes[i].id === data.id) {
        newNotes[i] = data;
      }
    }
    set(NOTES, JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  useEffect(() => {
    loadSaved();
  }, [get, set]);

  return {saveNote, deleteNote, loadSaved, loadByID, editNote, notes};
}
