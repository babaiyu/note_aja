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
import dayjs from 'dayjs';
import {useNote} from 'src/hooks/useNote';
import './styles.css';

type InputForm = {
  title: string;
  description: string;
};

interface Props extends RouteComponentProps<{}> {}

const AddNote: React.FC<Props> = (props) => {
  // Props
  const {control, handleSubmit, errors} = useForm<InputForm>();
  const {saveNote} = useNote();

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
      date: dayjs().format('DD-MM-YYYY'),
    };

    saveNote(payload);
    setTimeout(() => {
      props.history.replace('/home');
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{required: true}}
          render={({onChange, onBlur, value}) => (
            <IonItem className="content">
              <IonLabel position="floating">Title</IonLabel>
              <IonInput
                name="title"
                value={value}
                onIonChange={onChange}
                onIonBlur={onBlur}
                debounce={10}
                color={errors.title ? 'danger' : 'primary'}
              />
              {errors.title && <small>{errors.title}</small>}
            </IonItem>
          )}></Controller>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{required: true}}
          render={({onChange, onBlur, value}) => (
            <IonItem className="content">
              <IonLabel position="floating">Note</IonLabel>
              <IonTextarea
                rows={6}
                cols={20}
                placeholder="Tulis note-mu disini..."
                name="description"
                value={value}
                onBlur={onBlur}
                onIonChange={onChange}
                color={errors.description ? 'danger' : 'primary'}
              />
              {errors.description && <small>{errors.description}</small>}
            </IonItem>
          )}></Controller>
        <IonButton
          expand="block"
          onClick={handleSubmit(onSubmit)}
          className="content">
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
