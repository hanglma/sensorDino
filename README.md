# Sensor Dino

## Idea

Using _vite_ with _vanilla-typescript_ as a base. The idea is to read the sensors of a phone/tablet to play chromeDino by jumping. The plan is to deploy the result on gh-Pages.

## Challanges

### vite and gh-Pages

When deploying on gh-Pages you need a gh-pages branch. This can easily be setup following this guide: https://github.com/gitname/react-gh-pages (this tutorial referes to a react-app but the steps for vite are the same)
Attention: The package for creating the branch needs build folder named 'build' (Vite's standart the 'dist' build folder). Add these lines of code into your 'vite.config.js' file to set vite's output folder:

```
// vite.config.js
export default {
    // config options
    // root: "sensorBird",
    base: '',
    build: {
        outDir: 'build',
    },
};

```

### iOS and sensor data

For Windows and Android you can easily acces the sensor data needed by setting up a eventlistener for 'devicemotion'. For iOS the permission to use these sensors needs to be requested before using them. In my code it looks like this:

```
async function requestDeviceOrientation() {
	if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
		// Handle iOS 13+ devices.
		(DeviceMotionEvent as any)
			.requestPermission()
			.then((state: any) => {
				if (state === 'granted') {
					window.addEventListener('devicemotion', jump);
				} else {
					console.error('Request to access the orientation was rejected');
				}
			})
			.catch(console.error);
	} else {
		// Handle regular non iOS 13+ devices.
		window.addEventListener('devicemotion', jump);
	}
}
´´´

This function is triggered when the 'start game' button is pressed, which requestes the permission.

```
