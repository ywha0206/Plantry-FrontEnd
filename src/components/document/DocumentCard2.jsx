import React from 'react'
import '@/components/document/DocumentCard1.scss'

export const DocumentCard2 = ({
  file,  
  fileName,
  path
}) => {

  const fileServerBaseUrl = "http://43.202.45.49:90"; // File server base URL
  const thumbnailPath = "/thumbnails/0504fbd1-3e90-4559-ac8e-f6b3c567a03c.png.jpg";
  const thumbnailUrl = `${fileServerBaseUrl}${thumbnailPath}`;

  return (
    <div className='document-card2 inline-block'>
        <div className='flex items-center justify-center mb-4'>
            <img src={thumbnailUrl} alt="Thumbnail" />
        </div>
        <div className='flex flex-col justify-center items-center'>
            <p className='text-xs opacity-40'>{fileName}</p>
        </div>
    </div>
  )
}
