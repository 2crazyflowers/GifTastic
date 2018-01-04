//create variable named topics to contain string of animals
var topics = ["dog", "cat", "rabbit", "turtle", "fish", "squirrel", "deer", "skunk", "bear", "snake", "salamander"];
var animalBtn;
var animalImage;

function renderButtons() {
//want to pull data-animal from variable

  //have to empty the buttons so they do not add all after another animal is added
  $("#buttons").empty();

  //how do you empty the box of previously added animals???
  $("#animal-input").empty();

  //create a for-loop to iterate through the topics array
  for (var i=0; i < topics.length; i++) {
    //create a variable equal to button
    var animalBtn = $("<button>");

    //give each animalBtn its class
    animalBtn.addClass("animal-btn");

    //then give each animalBtn a data-attribute called data-animal
    animalBtn.attr("data-animal", topics[i]);

    //then give each animalBtn text equal to its name
    animalBtn.text(topics[i]);

    //then append each animalBtn to the buttons div
    $("#buttons").append(animalBtn);

    console.log(topics[i]);
  }
}

//this function displays images of the animal chosen by user
function displayImages() {
  //clear previous images that have been displayed
  $(".item").empty();

  $(".animal-btn").on("click", function() {

    var animal = $(this).attr("data-animal");
    console.log("this: " + this);
    console.log("animal: " + animal);
    //
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WtL7a88I6lDSvslFMP2JlDT1WvGXcUET&limit=10";

    //
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    //
    .done(function(response) {

      console.log(response);
      //
      var results = response.data;

      //want to see 10 gifs each time button pressed
      for (var i = 0; i < results.length; i++) {
        //create variable with a div to put image and rating in
        var gifDiv = $("<div class='item'>");

        //variable created to hold rating of specific gif
        var rating = results[i].rating;

        //put rating on html in paragraph
        var p = $("<p>").text("Rating: " + rating);


        var animalImage = $("<img>");

        animalImage.attr("src", results[i].images.fixed_height_still.url);

        animalImage.attr("data-state", "still");

        animalImage.attr("data-still", results[i].images.fixed_height_still.url);

        animalImage.attr("data-animate", results[i].images.fixed_height.url);

        animalImage.addClass("gif");

        gifDiv.prepend(animalImage);
        gifDiv.prepend(p);

        $("#gifs-appear-here").prepend(gifDiv);
        
      }

      $(".gif").on("click", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }

        else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
      });
    });
  
  });
}

//this allows user to add new animal to list
$("#add-animal").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box and trim any extra spaces entered
  var newTopic = $("#animal-input").val().trim();

  // The animal from the textbox is then added to our array
  topics.push(newTopic);

  // call renderButtons which handles the processing of topics
  renderButtons();

});

// Call the renderButtons function at least once to display the initial list of animals
renderButtons();

$(document).on("click", ".animal-btn", displayImages);