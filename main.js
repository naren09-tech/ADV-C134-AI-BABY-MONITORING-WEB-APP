var img = "";
objects = [];
var status1 = "";
function preload() {
    img = loadImage("dog_cat.jpg");
    song1 = loadSound("siren.mp3");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

}
function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}
function modelLoaded() {
    console.log("Model Loaded");
    status1 = true;
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(video, 0, 0, 380, 380);

    if (status1 != "") {
        if (objects.length > 0) {


            objectDetector.detect(video, gotResults);
            for (i = 0; i < objects.length; i++) {
                document.getElementById("number_of_objects").innerHTML = "Baby detected";
                if (objects[i].label == "person") {
                    song1.stop();
                    document.getElementById("number_of_objects").innerHTML = "Baby detected";
                    fill("red");
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "% ", objects[i].x + 15, object[i].y + 15);
                    noFill();
                    stroke("red");
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                }
                else {
                    song1.play();
                    document.getElementById("number_of_objects").innerHTML = "Baby not detected";
                }
            }
            else{
                song1.play();
            }
        }
    }
}