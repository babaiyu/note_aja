import {IonContent, IonPage, IonFab, IonFabButton, IonIcon} from '@ionic/react';
import {add} from 'ionicons/icons';
import {RouteComponentProps} from 'react-router';
import './Home.css';

interface Props extends RouteComponentProps<{}> {}

const Home: React.FC<Props> = (props) => {
  // Props
  const {history} = props;

  // Navigate to Form Add Note
  const onAddNote = (e: any) => {
    e.preventDefault();
    history.push('/addnote');
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <strong>Note Aja</strong>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={onAddNote}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
