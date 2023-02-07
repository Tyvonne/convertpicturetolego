import React, { useState, useRef, useEffect } from 'react';

const ImagePixelator = ({ src, scale }) => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImage(image);
    };
  }, [src]);

  useEffect(() => {
    if (!image) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;
    context.imageSmoothingEnabled = false;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }, [image, scale]);

  return <canvas ref={canvasRef} />;
};

export default ImagePixelator;