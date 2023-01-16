import React, { useRef, useEffect, useState } from 'react';
import gamme from './gamme.json';

import logo from './logo.svg';
import image from './Présentation1.jpg';
import imageH from './31205-HARLEY.jpg';

//import colorList from './gamme.json';
const colorList = [[4, 19, 28], [0, 84, 190], [247, 186, 59], [200, 25, 8], [145, 156, 119]]
//const [closestColor, setClosestColor] = useState([250, 5, 5]);

const MyComponent = () => {
  const gammeEntries = Object.entries(gamme);
  console.log(gammeEntries);

  const canvasRef = useRef(null);
  const x = 500;
  const y = 300;

  const img = new Image();
  img.src = image;
  //console.log(img);

  useEffect(() => {
    img.onload = () => {
      console.log('Width - ' + img.width)
      console.log('Height - ' + img.height)

      handleImageLoaded();
    };
  }, []);

  const handleImageLoaded = () => {

    const canvas = canvasRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const pixelData = imageData.data;
    // pixelData est un tableau de 4 valeurs (r, g, b, a) pour chaque pixel de l'image
    // console.log(pixelData);

    const index = (y * img.width + x) * 4;
    const selectedPixelColor = [pixelData[index], pixelData[index + 1], pixelData[index + 2]];
    console.log(selectedPixelColor);
    //console.log(`R: ${pixelData[index]}, G: ${pixelData[index + 1]}, B: ${pixelData[index + 2]}, A: ${pixelData[index + 3]}`);

    //setClosestColor(findClosestColor(selectedPixelColor, colorList))
    findClosestColor(selectedPixelColor, gammeEntries)
  };

  //const [targetRGB, setTargetRGB] = useState([250, 5, 5]);
  //const [closestColor, setClosestColor] = useState(null);

  function findClosestColor(rgb, colorList) {
    var closestColor = colorList[0][1];
    var closestDistance = Number.MAX_SAFE_INTEGER;
    for (var i = 0; i < colorList.length; i++) {
      var distance = calculateColorDistance(rgb, colorList[i][1]);
      if (distance < closestDistance) {
        closestColor = colorList[i];
        closestDistance = distance;
      }
    }
    console.log(closestColor);
    return closestColor;
  }

  function calculateColorDistance(rgb1, rgb2) {
    var r1 = rgb1[0], g1 = rgb1[1], b1 = rgb1[2];
    var r2 = rgb2[0], g2 = rgb2[1], b2 = rgb2[2];
    var rMean = (r1 + r2) / 2;
    var r = r1 - r2;
    var g = g1 - g2;
    var b = b1 - b2;
    return Math.sqrt((((512 + rMean) * r * r) >> 8) + 4 * g * g + (((767 - rMean) * b * b) >> 8));
  }

  //return <canvas ref={canvasRef} />;
  return (
    <div>
      <div><canvas ref={canvasRef} /></div>
    </div>
  );

};

export default MyComponent;