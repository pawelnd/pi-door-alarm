import fs from 'fs';
import path from 'path';

const MUSIC_BANK = './src/music/';
const ALARM_DURATION_SEC = 4;

const playerFactory = () => {
  const player = require('play-sound')({ mplayer: [] });
  let process = null;
  let isPlaying = false;

  const stopPlaying = () => {
    console.log('SOUND STOPPED');
    isPlaying = false;
    if (process) {
      process.kill('SIGINT');
      process = null;
    }
  };
  const getRandomSound = () => {
    const songs = fs.readdirSync(MUSIC_BANK).map((file) => {
      return path.join(MUSIC_BANK, file);
    });

    const songsAmount = songs.length;
    const randomIndex = Math.floor(songsAmount * Math.random());
    return songs[randomIndex];
  };

  return {
    playRandom: () => {
      if (isPlaying) {
        return;
      }
      isPlaying = true;
      const song = getRandomSound();
      console.log('SOUND FIRED');
      process = player.play(song, function (err) {
        if (err) {
          stopPlaying();
        }
        isPlaying = false;
        process = null;
      });
      setTimeout(stopPlaying, 1000 * ALARM_DURATION_SEC);
    },
    stop: stopPlaying,
  };
};

export default playerFactory;
