//array for buttons
var topics = ["Spongebob", "Pepe", "Doggo", "Cato", "Bamboozled"];

var topic;

$(document).ready(function() {
    renderButton();
});

function renderButton() {
    for (var i = 0; i < topics.length; i++) {
        
        $("#buttons").append("<button class='button'>" + topics[i] + "</button>");
    }
}


$(document).on("click", "button", function() {
    topic = $(this).text();
    console.log(topic);
    
    //api key
    var APIKey = "b5b598ce7fb8471882da248d11e64361";

//add giphy aip url
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&limit=10&q=" +topic;
    
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
    });
});

$("#submit").on("click", function() {
    $("#buttons").empty();
   var newTopic = $("#new-topic").val();
   topics.push(newTopic);
   if (topics.indexOf(newTopic) > -1) {
       renderButton();
   }
});

