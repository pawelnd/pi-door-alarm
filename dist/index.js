"use strict";var _soundPlayerFactory = _interopRequireDefault(require("./soundPlayerFactory"));
var _onoff = require("onoff");
var _gpio = _interopRequireDefault(require("./gpio.config"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

console.log("Started ".concat(new Date().toUTCString()));
var motionSensorGpio = new _onoff.Gpio(
_gpio.default.MOTION_SENSOR,
'in',
'rising',
{ debounceTimeout: 0 });

var player = (0, _soundPlayerFactory.default)();

motionSensorGpio.watch(function (err, value) {
  if (err) {
    throw err;
  }
  if (value === _onoff.Gpio.HIGH) {
    console.log('MOTION FOUND ');
    player.playRandom();
  }
});

process.on('SIGINT', function (_) {
  motionSensorGpio.unexport();
});

setInterval(function () {
  console.log("Health check ".concat(new Date().getTime()));
}, 1000 * 10);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiRGF0ZSIsInRvVVRDU3RyaW5nIiwibW90aW9uU2Vuc29yR3BpbyIsIkdwaW8iLCJHUElPX0NPTkZJRyIsIk1PVElPTl9TRU5TT1IiLCJkZWJvdW5jZVRpbWVvdXQiLCJwbGF5ZXIiLCJ3YXRjaCIsImVyciIsInZhbHVlIiwiSElHSCIsInBsYXlSYW5kb20iLCJwcm9jZXNzIiwib24iLCJfIiwidW5leHBvcnQiLCJzZXRJbnRlcnZhbCIsImdldFRpbWUiXSwibWFwcGluZ3MiOiJhQUFBO0FBQ0E7QUFDQSw2RDs7QUFFQUEsT0FBTyxDQUFDQyxHQUFSLG1CQUF1QixJQUFJQyxJQUFKLEdBQVdDLFdBQVgsRUFBdkI7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBRyxJQUFJQyxXQUFKO0FBQ3ZCQyxjQUFZQyxhQURXO0FBRXZCLElBRnVCO0FBR3ZCLFFBSHVCO0FBSXZCLEVBQUVDLGVBQWUsRUFBRSxDQUFuQixFQUp1QixDQUF6Qjs7QUFNQSxJQUFNQyxNQUFNLEdBQUcsa0NBQWY7O0FBRUFMLGdCQUFnQixDQUFDTSxLQUFqQixDQUF1QixVQUFDQyxHQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFDckMsTUFBSUQsR0FBSixFQUFTO0FBQ1AsVUFBTUEsR0FBTjtBQUNEO0FBQ0QsTUFBSUMsS0FBSyxLQUFLUCxZQUFLUSxJQUFuQixFQUF5QjtBQUN2QmIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWjtBQUNBUSxJQUFBQSxNQUFNLENBQUNLLFVBQVA7QUFDRDtBQUNGLENBUkQ7O0FBVUFDLE9BQU8sQ0FBQ0MsRUFBUixDQUFXLFFBQVgsRUFBcUIsVUFBQ0MsQ0FBRCxFQUFPO0FBQzFCYixFQUFBQSxnQkFBZ0IsQ0FBQ2MsUUFBakI7QUFDRCxDQUZEOztBQUlBQyxXQUFXLENBQUMsWUFBTTtBQUNoQm5CLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUix3QkFBNEIsSUFBSUMsSUFBSixHQUFXa0IsT0FBWCxFQUE1QjtBQUNELENBRlUsRUFFUixPQUFPLEVBRkMsQ0FBWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbGF5ZXJGYWN0b3J5IGZyb20gJy4vc291bmRQbGF5ZXJGYWN0b3J5JztcbmltcG9ydCB7IEdwaW8gfSBmcm9tICdvbm9mZic7XG5pbXBvcnQgR1BJT19DT05GSUcgZnJvbSAnLi9ncGlvLmNvbmZpZyc7XG5cbmNvbnNvbGUubG9nKGBTdGFydGVkICR7bmV3IERhdGUoKS50b1VUQ1N0cmluZygpfWApO1xuY29uc3QgbW90aW9uU2Vuc29yR3BpbyA9IG5ldyBHcGlvKFxuICBHUElPX0NPTkZJRy5NT1RJT05fU0VOU09SLFxuICAnaW4nLFxuICAncmlzaW5nJyxcbiAgeyBkZWJvdW5jZVRpbWVvdXQ6IDAgfSxcbik7XG5jb25zdCBwbGF5ZXIgPSBwbGF5ZXJGYWN0b3J5KCk7XG5cbm1vdGlvblNlbnNvckdwaW8ud2F0Y2goKGVyciwgdmFsdWUpID0+IHtcbiAgaWYgKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxuICBpZiAodmFsdWUgPT09IEdwaW8uSElHSCkge1xuICAgIGNvbnNvbGUubG9nKCdNT1RJT04gRk9VTkQgJyk7XG4gICAgcGxheWVyLnBsYXlSYW5kb20oKTtcbiAgfVxufSk7XG5cbnByb2Nlc3Mub24oJ1NJR0lOVCcsIChfKSA9PiB7XG4gIG1vdGlvblNlbnNvckdwaW8udW5leHBvcnQoKTtcbn0pO1xuXG5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBIZWFsdGggY2hlY2sgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gICk7XG59LCAxMDAwICogMTApO1xuIl19