import React, { useRef, useEffect } from 'react';
import gamme from './gamme.json';

import logo from './logo.svg';
import image from './Présentation1.jpg';
import imageH from './31205-HARLEY.jpg';

const MainComponent = () => {
  const gammeEntries = Object.entries(gamme);
  console.log(gammeEntries);

  const canvasRef = useRef(null);
  const canvasLego = useRef(null);
  // Permet de pointer un pixel en particulier selon ses coordonnées
  //const x = 500;
  //const y = 300;

  const img = new Image();
  img.src = imageH;
  //console.log(img);

  useEffect(() => {
    img.onload = () => {
      handleImageLoaded();
      //console.log('Width - ' + img.width)
      //console.log('Height - ' + img.height)
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
    //console.log(pixelData);
    console.log(pixelData.length / 4);

    // Définition du canvas de l'image transformée
    const canvasTarget = canvasLego.current;
    canvasTarget.width = img.naturalWidth;
    canvasTarget.height = img.naturalHeight;

    const ctxTarget = canvasTarget.getContext('2d');
    const imageDataTarget = ctxTarget.getImageData(0, 0, img.width, img.height);
    const pixelDataTarget = imageDataTarget.data;


    const cache = new Map();
    // Permet de pointer un pixel en particulier selon ses coordonnées
    //const index = (y * img.width + x) * 4;
    // Ici on prend tous les pixels de l'image
    for (var index = 0; index < pixelData.length / 4; index++) {
      const selectedPixelColor = [pixelData[index * 4], pixelData[index * 4 + 1], pixelData[index * 4 + 2]];
      //console.log(selectedPixelColor);
      //console.log(`R: ${pixelData[index]}, G: ${pixelData[index + 1]}, B: ${pixelData[index + 2]}, A: ${pixelData[index + 3]}`);

      if (selectedPixelColor) {
        let closestColor = cache.get(JSON.stringify(selectedPixelColor));
        if (!closestColor) {
          closestColor = findClosestColor(selectedPixelColor, gammeEntries);
          cache.set(JSON.stringify(selectedPixelColor), closestColor);
        } else {
          closestColor = cache.get(JSON.stringify(selectedPixelColor));
        }
        //console.log(closestColor);
        pixelDataTarget[index * 4] = closestColor[1][0];
        pixelDataTarget[index * 4 + 1] = closestColor[1][1];
        pixelDataTarget[index * 4 + 2] = closestColor[1][2];
        pixelDataTarget[index * 4 + 3] = closestColor[1][3];
      }

    }
    console.log(`Cache size: ${cache.size}`);
    ctxTarget.putImageData(imageDataTarget, 0, 0)
  };

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

  return (
    <div>
      <div><canvas ref={canvasRef} /></div>
      <div></div>
      <div><canvas ref={canvasLego} /></div>
    </div>
  );

};

export default MainComponent;