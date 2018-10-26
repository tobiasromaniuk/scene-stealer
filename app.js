// set constraints
var constraints = { video: { facingMode: "user" }, audio: false };

// Define constants
const cameraView = document.querySelector("#camera--view"),
	cameraOutput = document.querySelector("#camera--output"),
	cameraSensor = document.querySelector("#camera--sensor"),
	cameraTrigger = document.querySelector("#camera--trigger")

function cameraStart() {
	navigator.mediaDevices
	.getUserMedia(constraints)
	.then(function(stream) {
		track = stream.getTracks()[0];
		cameraView.srcObject = stream;
	})
	.catch(function(error) {
		console.error("Oops. It's borken.", error);
	});

//Take a picture when the shutter button (cameraTrigger) is hit
cameraTrigger.onclick = function() {
	cameraSensor.width = cameraView.videoWidth;
	cameraSensor.height = cameraView.videoHeight;
	cameraSensor.getContext("2D").drawImage(cameraView, 0, 0);
	cameraOutput.src = cameraSensor.toDataURL("image/webp");
	cameraOutput.classList.add("taken");
};

//start the video stream when the window loads (the camera lens view)
window.addEventListener("load", cameraStart, false);

}
