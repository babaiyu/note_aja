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
  IonCardSubtitle,
  useIonViewDidEnter,
} from '@ionic/react';
import {add, close, trash, pencil} from 'ionicons/icons';
import {useState} from 'react';
import {RouteComponentProps} from 'react-router';
import Lottie, {Options as LottieOptions} from 'react-lottie';
import {NoteProps, useNote} from '../hooks/useNote';
import emptyBox from '../assets/lottie/empty_box.json';
import './styles.css';

interface Props extends RouteComponentProps<{}> {}

const Home: React.FC<Props> = (props) => {
  // Props
  const {history} = props;
  const {notes, deleteNote, loadSaved} = useNote();

  // State
  const [noteDelete, setDelete] = useState<NoteProps>();

  // Navigate to Form Add Note
  const onAddNote = (e: any) => {
    e.preventDefault();
    history.push('/note/add');
  };

  // Set Delete note
  const onDelete = (note: any) => {
    setDelete(note);
  };

  // useEffect
  useIonViewDidEnter(() => {
    loadSaved();
  });

  // Config
  const lottieOptions: LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyBox,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Beranda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="content">
        <IonGrid>
          {notes.length > 0 ? (
            notes.map((i) => (
              <IonRow key={i.id}>
                <IonCol size="12">
                  <IonCard onClick={() => onDelete(i)}>
                    <IonCardHeader>
                      <IonCardSubtitle>{i.date}</IonCardSubtitle>
                      <IonCardTitle>{i.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{i.description}</IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))
          ) : (
            <IonRow className="center">
              <IonCol size="12">
                <Lottie height={400} width={400} options={lottieOptions} />
                <small>Tidak Ada Data</small>
              </IonCol>
            </IonRow>
          )}
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
            text: 'Edit',
            role: 'destructive',
            icon: pencil,
            handler: () => {
              if (noteDelete) {
                props.history.push(`/note/edit/${noteDelete.id}`);
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
