//create variable named topics to contain string of animals
var topics = ["dog", "cat", "rabbit", "turtle", "fish", "squirrel", "deer", "skunk", "bear", "snake", "salamander"];
var animalBtn;
var animalImage;

function renderButtons() {
//want to pull data-animal from variable
  
  //have to empty the buttons so they do not add all after another animal is added
  $("#buttons").empty();

  //empty the box of previously added animals
  $("#animal-input").val("");

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

//this function displays images of the animal chosen by user and is activated when user clicks animal-btn
function displayImages() {
  //for some reason this is doubled etc if buttons are hit without refreshing page=====================================why??
  //clear previous images that have been displayed
  $("#gifs-appear-here").empty();
  $(".item").empty();

  // $(".animal-btn").on("click", function() {

    var animal = $(this).attr("data-animal");
    console.log("this: " + this);
    console.log("animal: " + animal);
    //
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WtL7a88I6lDSvslFMP2JlDT1WvGXcUET&limit=10";

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
        console.log("results.length: " + results.length);
        //create variable with a div to put image and rating in
        var gifDiv = $("<div class='item float-left'>");

        //variable created to hold rating of specific gif
        var rating = results[i].rating;

        //put rating on html in paragraph
        var p = $("<p>").text("Rating: " + rating);

        //create variable called animalImage and put into image element
        var animalImage = $("<img>");

        //give animalImage src and image information
        animalImage.attr("src", results[i].images.fixed_height_still.url);

        //give animalImage data-state information to allow image to be in still state
        animalImage.attr("data-state", "still");

        //give animalImage data-still image information to allow image to be in still state
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);

        //give animalImage data-animate image information so when clicked it will play gif
        animalImage.attr("data-animate", results[i].images.fixed_height.url);

        //add a class to animalImage
        animalImage.addClass("gif");


        //for each image/paragraph prepend to div 
        gifDiv.prepend(animalImage);
        gifDiv.prepend(p);


        //put image and image div on browser
        $("#gifs-appear-here").prepend(gifDiv);
        
      }

      //click function on gif to allow user to play the gif
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
  
  }


//this allows user to add new animal to list
$("#add-animal").on("click", function(event) {
  //event.preventDefault() prevents the form from trying to submit itself
  //form used so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  //grab the text from the input box and trim any extra spaces entered
  var newTopic = $("#animal-input").val().trim();

  //takes animal entered from the textbox and adds it to our array of topics
  topics.push(newTopic);

  // call renderButtons which handles the processing of topics
  renderButtons();

});

//renderButtons function called to display the initial list of animals
renderButtons();

// click event on the animal-btn to listen for which animal user pics
$(document).on("click", ".animal-btn", displayImages);