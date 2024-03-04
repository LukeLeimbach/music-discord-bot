import React from 'react';
import '../css/Dropzone.css';
import {useDropzone} from 'react-dropzone';

function Dropzone(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  return (
    <>
        <h1>Upload your own music</h1>
        <section className='dropzone-container'>
        <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        </section>
    </>
  );
}

export default Dropzone;