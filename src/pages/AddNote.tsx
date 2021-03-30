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
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import {close} from 'ionicons/icons';
import {RouteComponentProps} from 'react-router';
import {useForm, Controller} from 'react-hook-form';
import dayjs from 'dayjs';
import {useNote} from 'src/hooks/useNote';
import './styles.css';
import {useState} from 'react';

type InputForm = {
  title: string;
  description: string;
};

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

const AddNote: React.FC<Props> = (props) => {
  // Props
  const {control, handleSubmit, errors} = useForm<InputForm>();
  const {saveNote, loadByID, editNote} = useNote();
  const paramID = props?.match?.params?.id ?? undefined;

  // State
  const [form, setForm] = useState<InputForm>({title: '', description: ''});
  const [loading, setLoading] = useState(false);

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
      id: paramID ?? `${titleLower}_${randomID}`,
      date: dayjs().format('DD MMM, YYYY'),
    };

    if (paramID === undefined) saveNote(payload);
    else editNote(payload);
    setTimeout(() => {
      props.history.replace('/home');
    }, 1000);
  };

  useIonViewDidEnter(() => {
    if (paramID) {
      setLoading(true);
      loadByID(paramID).then((res: any) => {
        setForm({
          title: res?.title,
          description: res?.description,
        });
        setTimeout(() => {
          setLoading(false);
        }, 100);
      });
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {props.match.params?.id ? 'Edit Note' : 'Tambah Note'}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {!loading && (
          <Controller
            name="title"
            control={control}
            defaultValue={form.title}
            rules={{required: true, minLength: 3}}
            render={({onChange, onBlur, value}) => (
              <IonItem className="content">
                <IonLabel
                  position="floating"
                  color={errors.title ? 'danger' : undefined}>
                  Title
                </IonLabel>
                <IonInput
                  name="title"
                  value={value}
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  debounce={10}
                  color={errors.title ? 'danger' : undefined}
                />
                {errors?.title && (
                  <IonText color="danger">Wajib Diisi!</IonText>
                )}
              </IonItem>
            )}
          />
        )}
        {!loading && (
          <Controller
            name="description"
            control={control}
            defaultValue={form.description}
            rules={{required: true, minLength: 3}}
            render={({onChange, onBlur, value}) => (
              <IonItem className="content">
                <IonLabel
                  position="floating"
                  color={errors.title ? 'danger' : undefined}>
                  Note
                </IonLabel>
                <IonTextarea
                  rows={6}
                  cols={20}
                  placeholder="Tulis note-mu disini..."
                  name="description"
                  value={value}
                  onBlur={onBlur}
                  onIonChange={onChange}
                  color={errors.description ? 'danger' : undefined}
                />
                {errors.description && (
                  <IonText color="danger">Wajib Diisi!</IonText>
                )}
              </IonItem>
            )}
          />
        )}
        <IonButton
          expand="block"
          onClick={handleSubmit(onSubmit)}
          className="content">
          {paramID ? 'EDIT' : 'TAMBAH'}
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
