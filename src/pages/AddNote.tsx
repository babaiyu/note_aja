import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {close} from 'ionicons/icons';
import {RouteComponentProps} from 'react-router';
import {useForm, Controller} from 'react-hook-form';

type InputForm = {
  title: string;
  description: string;
};

interface Props extends RouteComponentProps<{}> {}

const AddNote: React.FC<Props> = (props) => {
  // Props
  const {control, handleSubmit, watch, errors} = useForm<InputForm>();

  // Navigate Back
  const onBack = (e: any) => {
    e.preventDefault();
    props.history.goBack();
  };

  // On Submit
  const onSubmit = (data: InputForm) => {
    const titleLower = data.title.toLocaleLowerCase().split(' ');
    const randomID = Math.floor(Math.random() * 99);
    const payload = {
      ...data,
      id: `${titleLower}_${randomID}`,
    };

    console.log(payload);
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
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <IonItem>
              <IonLabel position="floating">Title</IonLabel>
              <IonInput
                name="title"
                value={value}
                onIonChange={onChange}
                onIonBlur={onBlur}
              />
            </IonItem>
          )}></Controller>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({onChange, onBlur, value}) => (
            <IonItem>
              <IonLabel position="floating">Note</IonLabel>
              <IonTextarea
                rows={6}
                cols={20}
                placeholder="Tulis note-mu disini..."
                name="description"
                value={value}
                onBlur={onBlur}
                onIonChange={onChange}
              />
            </IonItem>
          )}></Controller>
        <IonButton expand="block" onClick={handleSubmit(onSubmit)}>
          TAMBAH
        </IonButton>
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
