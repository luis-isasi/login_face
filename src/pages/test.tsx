import React, { useRef, useState } from 'react';

const Test = () => {
  const selectRef = useRef<HTMLInputElement>();
  const imgPreview = useRef<HTMLImageElement>();
  const [imgUrl, setImgUrl] = useState(null);

  console.log({ imgUrl });

  const onChange = (e) => {
    // Los archivos seleccionados, pueden ser muchos o uno
    const archivos = e.files;
    // const archivos = selectRef.files;
    // Si no hay archivos salimos de la función y quitamos la imagen
    if (!archivos || !archivos.length) {
      imgPreview.current.src = '';
      return;
    }
    // Ahora tomamos el primer archivo, el cual vamos a previsualizar
    const primerArchivo = archivos[0];
    // Lo convertimos a un objeto de tipo objectURL
    const objectURL = URL.createObjectURL(primerArchivo);
    // Y a la fuente de la imagen le ponemos el objectURL
    console.log({ objectURL });

    setImgUrl(objectURL);
  };

  return (
    <div>
      <h1>Previsualización de imagen</h1>
      <a href="//parzibyte.me/blog" target="_blank" rel="noreferrer">
        By Parzibyte
      </a>
      <input
        onChange={onChange}
        onDrop={onChange}
        onDragEnter={onChange}
        onDragLeave={onChange}
        type="file"
        ref={selectRef}
        accept="image/*"
      />
      <img ref={imgPreview} alt="asf" />
    </div>
  );
};

export default Test;
