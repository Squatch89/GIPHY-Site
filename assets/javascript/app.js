//array for buttons
var topics = ["Spongebob", "Pepe", "Doggo", "Cat", "Kermit"];

var topic;

var state = "still";

// var imgClicked;
//
// var gifs = [];

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
    gifs = [];
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
            
            resultDiv.append(image);
            resultDiv.append(p);
            
            $("#gifs").prepend(resultDiv);
            //
            // gifs.push(results[i]);
            // console.log(gifs);
        }
    
        $(".image").on("click", function() {
            console.log(imgClicked);
            
            if (state === "still") {
                image.attr("src", imgUrl);
                state = "animate";
            }
            else {
                image.attr("src", imgUrlStill);
                state = "still";
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
   if (topics.indexOf(newTopic) > -1) {
       renderButton();
   }
});

