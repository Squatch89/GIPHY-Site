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
            
            imgClicked = stillArray.indexOf($(this).attr("src"));
            console.log(imgClicked + " imgClicked value");
            
            imgState = $(this).data();
            console.log(imgState);
            
            if (imgState === "still" ) {
                console.log("yay it's moving");
                imgState = $(this).data("state", "animate");
            }
            else {
                console.log("now i'ts still");
                imgState = $(this).data("state", "still");
            }
        });
        console.log("button click");
    });
});


//adds new buttons
$("#submit").on("click", function() {
    $("#buttons").empty();
   var newTopic = $("#new-topic").val();
   topics.push(newTopic);
   if ((topics.indexOf(newTopic) > -1)) {
       renderButton();
       $("#new-topic").val(" ");
   }
});

