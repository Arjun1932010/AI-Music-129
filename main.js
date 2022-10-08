song_1 = "";
song_2 = "";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
leftWristScore = 0;
var status = "";
song1_status=0;
song2_status=0;
function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw() {
    image(video, 0, 0, 600, 500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if (leftWristScore > 0.2) {
        fill("blue");
        stroke("golden");
        circle(leftWrist_x,leftWrist_y,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song_name").innerHTML="Song name= "+song1;
        }
    }
}
function modelLoaded() {
    console.log("Model is loaded");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("leftWristScore=" + leftWristScore);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
    }
}