//array for buttons
var topics = ["Spongebob", "Pepe", "Doggo", "Cat", "Kermit"];

var topic;

var state = "still";

var imgState;

var imgClicked;

var stillArray = [];

var movingArray = [];

$(document).ready(function() {
    renderButton();
});

function renderButton() {
    for (var i = 0; i < topics.length; i++) {
        
        $("#buttons").append("<button class='topic'>" + topics[i] + "</button>");
    }
}

$(document).on("click", ".topic", function() {
    $("#gifs").empty();
    topic = $(this).text();
    state = "still";
    stillArray = [];
    movingArray = [];
    console.log(topic);
    
    //api key
    var APIKey = "b5b598ce7fb8471882da248d11e64361";

    //giphy api url
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&limit=10&q=" +topic;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        
        var results = response.data;
        console.log(results);
        
        for (var i = 0; i < results.length; i++) {
            
            var resultDiv = $("<div>");
            
            var imgUrlStill = results[i].images.fixed_height_still.url;
            
            var imgUrl = results[i].images.fixed_height.url;
    
            var p = $("<p>");
    
            var image = $("<img class='image'>");
    
            p.text("Rating: " + results[i].rating);
    
            image.attr("src", imgUrlStill);
            image.data("state", "still");
            
            resultDiv.append(image);
            resultDiv.append(p);
            
            $("#gifs").prepend(resultDiv);
            
            stillArray.push(results[i].images.fixed_height_still.url);
            movingArray.push(results[i].images.fixed_height.url);
        }
    
        $(".image").on("click", function() {
            
        
            
            imgState = $(this).data();
            console.log(imgState);
            
            if (state === imgState.state ) {
                //imgClicked is set to it's still gif in the array
                imgClicked = stillArray.indexOf($(this).attr("src"));
                console.log(imgClicked + " imgClicked value");
                
                console.log("yay it's moving");
                $(this).attr("src", movingArray[imgClicked]);
                
                imgState = $(this).data("state", "animate");
                
                imgClicked = movingArray.indexOf($(this).attr("src"));
                console.log(imgClicked + " imgClicked value inside the if statement");
            }
            else {
                imgClicked = movingArray.indexOf($(this).attr("src"));
                console.log("now i'ts still");
                
                $(this).attr("src", stillArray[imgClicked]);
                
                imgState = $(this).data("state", "still");
                
                imgClicked = stillArray.indexOf($(this).attr("src"));
            }
        });
        console.log("button click");
    });
});


//adds new buttons
$("#submit").on("click", function() {
   var newTopic = $("#new-topic").val();
    topics.push(newTopic);
    console.log(newTopic);
   if ((topics.indexOf(newTopic) > -1) && (newTopic !== " ")) {
       $("#buttons").empty();
       renderButton();
       $("#new-topic").val(" ");
   }
});

