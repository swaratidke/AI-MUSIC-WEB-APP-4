song1 = "";
song2 =" ";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist=0;
X="";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('Pose', gotPoses);

}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scoreleftWrist = results[0].pose.keypoints[9].score;



    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log('leftWristX - ' + leftWristX + 'leftWristY - ' + leftWristY );
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log('rightWristX - ' + rightWristX + 'rightWristY - ' + rightWristY );
  }
  }

function draw(){
    image(video,0,0,600,500)
    fill("#2A2065 ");
    stroke("#543BE2 ");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreleftWrist > 0.2)
    {
      circle(leftWristX,leftWristY,20);
      song2.stop();
      if (song1_status==false)
      {
         song1.play();
         document.getElementById("song_status").innerHTML="song status = playing Harry Potter song" 
      }
    }

}