// Classifier Variable
let classifier;
// Model URL
let imageModelURL = '//address of the model//';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let question;
let yes;
let no;
let enjoy;
let fadeOut = 0;
// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  question = loadImage('question.png');
  yes = loadImage('yes.png');
  no = loadImage('no.png');
  enjoy = loadImage('enjoy.png');
}

function setup() {
  createCanvas(1280, 960);
  // Create the video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  tint(255);
  image(flippedVideo, 0, 0);

  if (label == 'question') {
    fadeOut = 255;

    if (fadeOut > 0) {
      tint(255, fadeOut);
      image(question, 300, -20);
      fadeOut -= 10;
    }
  }
  if (label == 'yes') {
    fadeOut = 255;

    if (fadeOut > 0) {
      tint(255, fadeOut);
      image(yes, 400, -20);
      fadeOut -= 10;
    }
  }
  if (label == 'no') {
    fadeOut = 255;

    if (fadeOut > 0) {
      tint(255, fadeOut);
      image(no, 300, -20);
      fadeOut -= 10;
    }
  }
  // if (label == 'enjoy') {
  //  fadeOut = 255;
  //  if (fadeOut > 0) {
  //    tint(255, fadeOut);
  //   image(question, 300, -20);
  //   fadeOut -= 10;
  // }
  //}
  // Draw the label
  // fill(255);
  //textSize(16);
  //textAlign(CENTER);
  //text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}