import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import UserForm from '@Components/UserForm';
import Auth from '@Services/auth';
import Link from '@Components/Links/Link';
import Webcam from 'react-webcam';
import { useMutation } from 'react-query';
import { uploadImage } from '../../firebase/client';

const Register = () => {
  const [stepRegister, setStepRegister] = useState<1 | 2>(1);

  const [imgSrc, setImgSrc] = useState(null);
  const [task, setTask] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const router = useRouter();
  const onSuccess = () => {
    // mostramos el compoente para rel reconociemiento facial
    setStepRegister(2);
  };

  const onError = () => {
    console.error('error');
  };

  useEffect(() => {
    if (task) {
      //podemos escuchar varios eventos, pero en este caso esucharemos el evento "state_changed"
      //state_changed recibe 3 parametros, esas son funciones para manejar la carga : (... onProgress, onError, onComplete)
      const onError = () => {};
      const onProgress = () => {};
      const onComplete = () => {
        console.log('se subio la imagen');

        //de esta manera obtenemos la url de la foto, esto devuelve una promesa con al url
        task.snapshot.ref.getDownloadURL().then((urlFirebase) => {
          console.log({ urlFirebase });

          // setImgUrl(urlFirebase);
          fetch(
            'https://fismyface.cognitiveservices.azure.com/face/v1.0/persongroups/my_friends/persons/ae27ebd9-608b-48a4-b9fd-b8151840f601/persistedFaces',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'cb9f03fa9e894a108e5546bb79e5000c',
              },
              body: JSON.stringify({
                url: urlFirebase,
              }),
            }
          )
            .then((res) => res.json())
            .then((response) => {
              console.log({ response });
            })
            .catch((e) => {
              console.log(e);
            });
        });
      };
      task.on('state_changed', onProgress, onError, onComplete);
    }
  }, [task]);

  useEffect(() => {
    if (imgSrc) {
      fetch(imgSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'File name', { type: 'image/png' });

          const task = uploadImage(file);
          setTask(task);
        });
    }
  }, [imgSrc]);

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });
    console.log({ imageSrc });
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 box-border px-4 sm:px-0 flex flex-col items-center">
        <p className="text-white font-extrabold text-4xl py-5">Únete :D</p>
        <div className="min-w-0 w-full max-w-xs">
          <UserForm
            mutation={Auth.AddUser}
            typeForm="register"
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>
        {/* <div className="bg-yellow-300 h-40 w-full">
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
          <img src={imgSrc} alt="sfas" />
          <img src={imgUrl} alt="sfas" />
        </div> */}
        <div className="mt-5">
          <span className="text-white text-xs">
            ¿Ya tienes una cuenta?
            <Link
              href={'/login'}
              className="text-green-500 font-semibold ml-2"
              text="iniciar sesión"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
