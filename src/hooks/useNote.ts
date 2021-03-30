import {useState, useEffect} from 'react';
import {useStorage} from '@ionic/react-hooks/storage';
import {isPlatform} from '@ionic/react';

export interface NoteProps {
  id: string;
  title: string;
  description: string;
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

  useEffect(() => {
    loadSaved();
  }, [get, set]);

  return {saveNote, deleteNote, loadSaved, notes};
}
