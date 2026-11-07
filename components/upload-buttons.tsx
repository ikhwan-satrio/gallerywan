'use client';

import { CldUploadButton } from 'next-cloudinary';
import { Suspense, useState } from 'react';
import type { CloudinaryUploadWidgetInfo } from 'next-cloudinary';

export function UploadButton() {
  const [uploadedImage, setUploadedImage] = useState<CloudinaryUploadWidgetInfo | null>(null);

  return (
    <Suspense>
      <CldUploadButton
        uploadPreset="ml_default"
        onSuccess={(result) => {
          if (result.info && typeof result.info !== 'string') {
            setUploadedImage(result.info);
            console.log('Upload successful:', result.info);
          }
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
        onError={(result, { widget }) => {
          console.log(result)
        }}
      >
        Upload Image
      </CldUploadButton>
      {uploadedImage && (
        <div style={{ marginTop: '2rem' }}>
          <p>Upload successful!</p>
          <p><strong>Public ID:</strong> {uploadedImage.public_id}</p>
        </div>
      )}
    </Suspense>
  );
}
