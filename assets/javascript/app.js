//array for buttons
var topics = ["Spongebob", "Pepe", "Doggo", "Cato", "Bamboozled"];

var topic;

var imgUrl;

var image;

var results;

$(document).ready(function() {
    renderButton();
});

function renderButton() {
    for (var i = 0; i < topics.length; i++) {
        
        $("#buttons").append("<button class='button'>" + topics[i] + "</button>");
    }
}

$(document).on("click", ".button", function() {
    $("#gifs").empty();
    topic = $(this).text();
    console.log(topic);
    
    
    //api key
    var APIKey = "b5b598ce7fb8471882da248d11e64361";

    //giphy api url
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&limit=10&q=" +topic;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        
        results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            
            var resultDiv = $("<div>");
            
            imgUrl = results[i].images.fixed_height_still.url;
    
            var p = $("<p>");
    
            image = $("<img>");
    
            p.text("Rating: " + results[i].rating);
    
            image.attr("src", imgUrl);
            image.data("state", "still");
            
            resultDiv.append(p);
            resultDiv.append(image);
            
            $("#gifs").prepend(resultDiv);
            
            
        }
        console.log("button click");
    });
});

$(document).on("click", "img", function() {
    if (image.data === "still") {
        imgUrl = results[i].images.fixed_height.url;
        state = "animate";
    }
    else {
        imgUrl = results[i].images.fixed_height_still.url;
        state = "still"
    }
    console.log("gif was clicked");
});



//adds new buttons
$("#submit").on("click", function() {
    $("#buttons").empty();
    $("#gifs").empty();
   var newTopic = $("#new-topic").val();
   topics.push(newTopic);
   if (topics.indexOf(newTopic) > -1) {
       renderButton();
   }
});

