import { useState, useEffect, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { useMutation } from 'react-query';

import ApiFace, { ResDetectFace, ResVerifyIdentity } from '@Services/apiFace';
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
  const [task, setTask] = useState(null);
  const [faceId, setFaceId] = useState<string | undefined>();
  const [imgUrl, setImgUrl] = useState<string>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const webcamRef = useRef(null);

  const {
    isLoading: isLoadingDetectFace,
    error: errorDetectFace,
    mutate: detectFace,
  } = useMutation<[ResDetectFace], { message: string }>(
    () => ApiFace.detectedFace({ url: imgUrl }),
    {
      onSuccess: (data) => {
        if (data[0]) {
          setFaceId(data[0].faceId);
        } else {
          setErrorMessage('No se ha detectado un rosto.');
        }
      },
    }
  );

  const {
    isLoading: isLoadingVerifyIdentity,
    error: errorVerifyIdentity,
    isSuccess: isSuccessVerifyIdentity,
    mutate: verifyFace,
  } = useMutation<ResVerifyIdentity, { message: string }>(
    () =>
      ApiFace.verifyIdentity({
        faceId,
        personId,
      }),
    {
      onSuccess: (data) => {
        if (data.isIdentical) {
          onSuccess();
        } else {
          setErrorMessage('Tu rostro no coincide 😕');
        }
      },
    }
  );

  //Verify Face
  useEffect(() => {
    if (faceId) {
      verifyFace();
    }
  }, [faceId]);

  //Detect Face
  useEffect(() => {
    if (imgUrl) {
      setErrorMessage('');
      detectFace();
    }
  }, [imgUrl]);

  useEffect(() => {
    if (task) {
      const onErrorFirebase = () => {};
      const onProgress = () => {};
      const onComplete = () => {
        //de esta manera obtenemos la url de la foto, esto devuelve una promesa con al url
        task.snapshot.ref.getDownloadURL().then(async (urlFirebase) => {
          setImgUrl(urlFirebase);
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
      <button
        disabled={isLoadingDetectFace || isLoadingVerifyIdentity}
        className="bg-indigo-700 hover:bg-indigo-600 disabled:bg-gray-700 font-bold text-white outline-none rounded-md mb-3 py-2 px-3"
        onClick={onCapture}
      >
        Capturar Rostro
      </button>
      <div className="bg-gray-300 my-2 h-auto w-full rounded-md overflow-hidden">
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
      </div>

      <p
        className={`${
          errorDetectFace || errorVerifyIdentity || errorMessage
            ? 'text-red-600'
            : 'text-green-500'
        } font-semibold text-base text-center w-full h-auto py-2`}
      >
        {isLoadingDetectFace
          ? 'Detectando tu rostro...'
          : errorDetectFace
          ? `${errorDetectFace?.message}`
          : isLoadingVerifyIdentity
          ? 'Verificando tu rostro...'
          : errorVerifyIdentity
          ? `${errorVerifyIdentity?.message}`
          : isSuccessVerifyIdentity && !errorMessage
          ? 'Rostro verificado exitosamente. :D'
          : ''}
        {errorMessage}
      </p>
      {imgUrl && <img className="my-2 rounded-md" src={imgUrl} alt={imgUrl} />}
    </>
  );
};

export default VerifyIdentity;
