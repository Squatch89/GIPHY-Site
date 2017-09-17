//array for buttons
var topics = ["Spongebob", "Pepe", "Doggo", "Cato", "Bamboozled"];

var topic;

var state = "still";

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
        
        var results = response.data;
        
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
            
        }
    
        $(".image").on("click", function() {
            console.log("image clicked");
            console.log(state + " outside if statement");
            if (state === "still") {
                image.attr("src", imgUrl);
                state = "animate";
                console.log(state + " inside if statement");
            }
            else {
                image.attr("src", imgUrlStill);
                state = "still";
                console.log(state + " inside else statement");
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

