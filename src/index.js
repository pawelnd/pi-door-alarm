




require('dotenv').config();
import {Gpio}  from 'onoff';
import GPIO_CONFIG from "./gpio.config";

console.log('Strted ' + new Date().toUTCString());
const motionSensorGpio = new Gpio(GPIO_CONFIG.MOTION_SENSOR, 'in', 'rising', {debounceTimeout: 10});


const playerFactory = () => {
  const player = require('play-sound')({mplayer: []})
  let process = null;
  let isPlaying = false;

  const stopPlaying = () => {
    console.log("SOUND STOPPED")
    isPlaying = false;
    if(process){
      process.kill('SIGINT');
      process = null;
    }  
  }
  const getRandomSound = () => {
    const fs = require('fs');
    const path = require('path');
    const MUSIC_BANK = './src/music/'
    const songs = fs.readdirSync(MUSIC_BANK)
        .map(file => {
          return path.join(MUSIC_BANK, file);
        });
    
        const songsAmount = songs.length;
        const randomIndex = Math.floor(songsAmount * Math.random());
        return songs[randomIndex];
  }
  
  return { 
    playRandom: () => {
      if(isPlaying){return;}
      isPlaying = true;
      const song = getRandomSound();
      console.log("SOUND FIRED")
      process = player.play(song, function(err){
        if (err) {
          stopPlaying();
        }
        isPlaying = false;
        process = null;
      })
      setTimeout(stopPlaying, 1000 * 4);
    },
    stop: stopPlaying
  }
}
const player = playerFactory();

motionSensorGpio.watch((err, value) => {
  if (err) { 
    throw err;
  }
  if(value === Gpio.HIGH){
    console.log("MOTION FOUND ")
    player.playRandom();
  } 
});
 
process.on('SIGINT', _ => {
  motionSensorGpio.unexport();
});

setInterval(() => {
  console.log(1);
},1000)