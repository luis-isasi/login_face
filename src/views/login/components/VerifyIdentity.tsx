import { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { useMutation } from 'react-query';

import ApiFace from '@Services/apiFace';
import { uploadImage } from '../../../firebase/client';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

interface Props {
  personId: string;
  onSuccess: () => void;
}

const VerifyIdentity: React.FC<Props> = ({ personId, onSuccess }) => {
  const [stepPhoto, setStepPhoto] = useState<number>(1);
  const [task, setTask] = useState(null);
  const [imgUrl, setImgUrl] = useState<string>(undefined);

  const webcamRef = useRef(null);
  //Add image to person
  const {
    data,
    isLoading,
    isError,
    mutate: addImgToPerson,
    error,
  } = useMutation(() => ApiFace.addImgToPerson({ url: imgUrl, personId }));

  useEffect(() => {
    if (data && !isLoading && !isError) {
      if (stepPhoto < 3) {
        setStepPhoto(stepPhoto + 1);
      } else {
        onSuccess();
      }
    }
  }, [data]);

  useEffect(() => {
    if (task) {
      const onErrorFirebase = () => {};
      const onProgress = () => {};
      const onComplete = () => {
        //de esta manera obtenemos la url de la foto, esto devuelve una promesa con al url
        task.snapshot.ref.getDownloadURL().then((urlFirebase) => {
          setImgUrl(urlFirebase);
          addImgToPerson();
        });
      };
      task.on('state_changed', onProgress, onErrorFirebase, onComplete);
    }
  }, [task]);

  //capture the image in base64
  const onCapture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });

    //convert img to file
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'File name', { type: 'image/png' });

        const task = uploadImage(file);

        setTask(task);
      });
  }, [webcamRef]);

  return (
    <>
      <p className="text-white font-normal text-base pb-2 text-center">
        <strong className="font-extrabold">Paso 2</strong>: verifica tú
        identidad tomandote 3 fotos
      </p>
      <button
        disabled={isLoading}
        className="bg-indigo-700 hover:bg-indigo-600 disabled:bg-gray-700 font-bold text-white outline-none rounded-md mb-3 py-2 px-3"
        onClick={onCapture}
      >
        {`Tomar foto ${stepPhoto}`}
      </button>
      <div className="bg-yellow-300 my-2 h-auto w-full rounded-md overflow-hidden">
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
      </div>
      {imgUrl && (
        <>
          {isLoading && (
            <p className="text-green-500 font-semibold text-base text-center w-full h-auto py-2">
              Detectando tu rostro...
            </p>
          )}
          {!isLoading && (
            <p
              className={`${
                error ? 'text-red-600' : 'text-green-500'
              } font-semibold text-base text-center w-full h-auto py-2`}
            >
              {error?.message || 'Rostro detectado exitosamente. :D'}
            </p>
          )}
          <img className="my-2 rounded-md" src={imgUrl} alt={imgUrl} />
        </>
      )}
    </>
  );
};

export default VerifyIdentity;
