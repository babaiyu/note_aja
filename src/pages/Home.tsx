import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonActionSheet,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import {add, close, trash} from 'ionicons/icons';
import {useState} from 'react';
import {RouteComponentProps} from 'react-router';
import {NoteProps, useNote} from '../hooks/useNote';

import './Home.css';

interface Props extends RouteComponentProps<{}> {}

const Home: React.FC<Props> = (props) => {
  // Props
  const {history} = props;
  const {notes, deleteNote} = useNote();

  // State
  const [noteDelete, setDelete] = useState<NoteProps>();

  // Navigate to Form Add Note
  const onAddNote = (e: any) => {
    e.preventDefault();
    history.push('/addnote');
  };

  // Set Delete note
  const onDelete = (note: any) => {
    setDelete(note);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Beranda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          {notes.map((i) => (
            <IonRow key={i.id}>
              <IonCol size="12">
                <IonCard onClick={() => onDelete(i)}>
                  <IonCardHeader>
                    <IonCardTitle>{i.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{i.description}</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={onAddNote}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonActionSheet
        isOpen={!!noteDelete}
        buttons={[
          {
            text: 'Hapus',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (noteDelete) {
                deleteNote(noteDelete);
                setDelete(undefined);
              }
            },
          },
          {
            text: 'Cancel',
            icon: close,
            role: 'cancel',
          },
        ]}
        onDidDismiss={() => setDelete(undefined)}
      />
    </IonPage>
  );
};

export default Home;
