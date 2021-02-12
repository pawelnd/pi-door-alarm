import playerFactory from './soundPlayerFactory';
import { Gpio } from 'onoff';
import GPIO_CONFIG from './gpio.config';

console.log(`Started ${new Date().toUTCString()}`);
const motionSensorGpio = new Gpio(
  GPIO_CONFIG.MOTION_SENSOR,
  'in',
  'rising',
  { debounceTimeout: 0 },
);
const player = playerFactory();

motionSensorGpio.watch((err, value) => {
  if (err) {
    throw err;
  }
  if (value === Gpio.HIGH) {
    console.log('MOTION FOUND ');
    player.playRandom();
  }
});

process.on('SIGINT', (_) => {
  motionSensorGpio.unexport();
});

setInterval(() => {
  console.log(`Health check ${new Date().getTime()}` );
}, 1000 * 10);
