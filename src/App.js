import React, { useState, useRef, useEffect } from 'react';
import gamme from './gamme.json';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';



function App() {
  const canvasRef = useRef(null);
  const [src, setSrc] = useState("");
  const [fileName, setFileName] = useState("");
  const [pixelType, setPixelType] = useState("pixels");
  const [image, setImage] = useState(null);
  const [scaleValue, setScaleValue] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageSize, setImageSize] = useState(0);
  const [checked, setChecked] = React.useState(false);

  const gammeEntries = Object.entries(gamme);

  const handleImageChange = (event) => {
    setSrc(URL.createObjectURL(event.target.files[0]));
    setFileName(event.target.files[0].name);
  };

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
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const smallCanvas = document.createElement('canvas');
    const smallContext = smallCanvas.getContext('2d');
    smallCanvas.width = canvas.width / scaleValue;
    smallCanvas.height = canvas.height / scaleValue;
    smallContext.drawImage(canvas, 0, 0, smallCanvas.width, smallCanvas.height);

    context.imageSmoothingEnabled = false;
    context.drawImage(smallCanvas, 0, 0, canvas.width, canvas.height);
    setImageHeight(smallCanvas.height);
    setImageWidth(smallCanvas.width);
    setImageSize(smallCanvas.height * smallCanvas.width);

  }, [image, scaleValue]);

  const handleScaleChange = (event, newValue) => {
    setScaleValue(newValue);
  };

  const switchChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      setPixelType("Lego bricks")
    } else { setPixelType("pixels") }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title="Load picture">
              <IconButton color="black" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                <PhotoCamera />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {fileName}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1, padding: "16px" }}>
        <Box sx={{ flexBasis: "40%" }}>
          <Typography id="input-slider" sx={{ minWidth: "120px" }}>
            Picture scale
          </Typography>
          <Slider
            aria-label="Scale"
            value={scaleValue}
            valueLabelDisplay="auto"
            onChange={handleScaleChange}
            step={1}
            marks
            min={1}
            max={20}
            sx={{ paddingRight: "16px", maxWidth: "500px" }}
          />
        </Box>

        <Box sx={{ flexBasis: "30%" }}>
          <Typography sx={{ minWidth: "120px", paddingLeft: "16px", paddingRight: "16px" }}>
            Picture size
          </Typography>
          <Typography sx={{ minWidth: "120px", paddingLeft: "16px", paddingRight: "16px" }}>
            Total number of {pixelType} : {imageSize} ({imageWidth} * {imageHeight})
          </Typography>

        </Box>

        <Box sx={{ flexBasis: "30%" }}>
          <Typography id="input-slider" sx={{ minWidth: "120px", paddingLeft: "16px", paddingRight: "16px" }}>
            Switch to Lego colors
          </Typography>
          <Switch
            checked={checked}
            onChange={switchChange}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <Box sx={{ flexBasis: "15%", padding: "16px" }}>
          Available Lego colors
          <List sx={{ width: '100%', minWidth: 200, bgcolor: 'background.paper' }}>
            {gammeEntries.map(([nom, couleur]) => (
              <Tooltip title={`RGB: ${couleur.join(', ')}`}>
                <ListItem key={nom}>
                  <ListItemAvatar>
                    <Avatar>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: `rgb(${couleur[0]}, ${couleur[1]}, ${couleur[2]})`
                      }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={nom} secondary="Number" />
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Box>

        <Box sx={{ flexBasis: "85%", padding: "16px" }}>
          Picture
          <Box><canvas ref={canvasRef} /></Box>
        </Box>
      </Box>

    </Box>


  );
}

export default App;