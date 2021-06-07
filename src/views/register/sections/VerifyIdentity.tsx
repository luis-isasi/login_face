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

const VerifyIdentity: React.FC<{ personId: string }> = ({ personId }) => {
  const [task, setTask] = useState(null);
  const [imgUrl, setImgUrl] = useState<string>(null);

  const webcamRef = useRef(null);
  const {
    data,
    isLoading,
    mutate: addImgToPerson,
  } = useMutation<{ persistedFaceId: string }>(() =>
    ApiFace.addImgToPerson({ url: imgUrl, personId })
  );

  console.log({ data });

  useEffect(() => {
    if (task) {
      const onErrorFirebase = () => {};
      const onProgress = () => {};
      const onComplete = () => {
        console.log('se subio la imagen');

        //de esta manera obtenemos la url de la foto, esto devuelve una promesa con al url
        task.snapshot.ref.getDownloadURL().then((urlFirebase) => {
          console.log({ urlFirebase });

          setImgUrl(urlFirebase);

          addImgToPerson();
        });
      };
      task.on('state_changed', onProgress, onErrorFirebase, onComplete);
    }
  }, [task]);

  //capture the image in base64
  const capture = useCallback(() => {
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
      <p className="text-white font-normal text-base py-1 text-center">
        <strong className="font-extrabold">Paso 2</strong>: verifica tú
        identidad tomandote 3 fotos
      </p>
      <div className="bg-yellow-300 h-auto w-full">
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
      </div>
      <button
        className="bg-indigo-700 hover:bg-indigo-600 text-white outline-none rounded-md py-2 px-3 "
        onClick={capture}
      >
        Capture photo
      </button>
      <img src={imgUrl} alt="sfas" />
    </>
  );
};

export default VerifyIdentity;
