import React from 'react';
import '../css/Dropzone.css';
import {useDropzone} from 'react-dropzone';

function Dropzone(props) {
  const {getRootProps, getInputProps} = useDropzone();

  return (
    <>
        <h1>Upload your own music</h1>
        <section className='dropzone-container'>
        <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Click or drop files here</p>
        </div>
        </section>
    </>
  );
}

export default Dropzone;