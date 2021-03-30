import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {close} from 'ionicons/icons';
import {RouteComponentProps} from 'react-router';

interface Props extends RouteComponentProps<{}> {}

const AddNote: React.FC<Props> = (props) => {
  // Navigate Back
  const onBack = (e: any) => {
    e.preventDefault();
    props.history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <strong>Add Note</strong>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={onBack}>
            <IonIcon icon={close} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default AddNote;
