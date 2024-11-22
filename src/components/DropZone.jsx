import React from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = () => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    }
  });

  return (
    <div className='flex items-center justify-center' {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      <p>파일을 드래그해주세요.</p>
    </div>
  );
};

const styles = {
  dropzone: {
    border: '1px dashed black',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    height: '170px'
  },
  
};

export default MyDropzone;
