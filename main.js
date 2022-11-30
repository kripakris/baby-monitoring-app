img = "";
song = "";
status ="";
object = [];
function preload(){
    song = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(350,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350,350);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : detecting objects";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
}


function gotResult(error , results){
if (error) {
    console.log(error);
}
console.log(results);

object = results;
}


function draw()
{
    image(video,0,0,350,350);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML = "Status : object detected";
        document.getElementById("baby").innerHTML = "number of objects ditected are :" + object.length;

        fill(r,g,b);
        percent = floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
        if(object[i].label == "person") 
        { document.getElementById("baby").innerHTML = "Baby Found";
          console.log("play");
          song.play();
        }
        else
        {document.getElementById("baby").innerHTML = "Baby Not Found";
        console.log("stop");
        song.stop();
    }
    }
    }
}