import React, { useState } from 'react';
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
  const [src, setSrc] = useState("");
  const [fileName, setFileName] = useState("");
  //const [scaleValue, setScaleValue] = useState();

  const gammeEntries = Object.entries(gamme);

  const handleImageChange = (event) => {
    setSrc(URL.createObjectURL(event.target.files[0]));
    setFileName(event.target.files[0].name);
  };

  const handleScaleChange = (event) => {
    //setScaleValue(event.value);
  };

  const label = { inputProps: { 'aria-label': 'Switch to Lego' } };

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
        <Box sx={{ flexBasis: "70%" }}>
          <Typography id="input-slider" sx={{ minWidth: "120px" }}>
            Picture scale
          </Typography>
          <Slider
            aria-label="Scale"
            defaultValue={1}
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
          <Typography id="input-slider" sx={{ minWidth: "120px", paddingLeft: "16px", paddingRight: "16px" }}>
            Switch to Lego colors
          </Typography>
          <Switch {...label} />
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
          <Box><img src={src} alt="" /></Box>
        </Box>
      </Box>

    </Box>


  );
}

export default App;