$(document).ready(function() {
  
    // array of tv shows to populate buttons

  var topics = [
    "Happy Days",
    "Laverne and Shirley",
    "Mork and Mindy",
    "Joanie Loves Chachi",
    "Sanford and Son",
    "Barney Miller",
    "The Jeffersons",
    "All In The Family",
    "Welcome Back Kotter"
  ];

  // function to GET attributes and display content to DOM using GIPHY API and JSON

  function displayInfo() {
    var tvshow = $(this).attr("tvshow-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      tvshow +
      "&api_key=yK1x208Y1xARtY78e7g2oXVWTf0LAH8V&limit=10";

    // use AJAX to GET information on tvshow button clicked

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      
      //empty tvshow div so new selection appends to empty div - do not want previous searches listed

      $("#tvshows").empty();

      var results = response.data;

      //for loop to grab the rating information and appropriate gif for button clicked into its own div to keep information together

      for (var i = 0; i < results.length; i++) {
        var tvshowDiv = $("<div class='userTvshow'>");

        //make variable for rating for clean appending

        var rating = results[i].rating;
        var pRate = $("<p>").text("Rating: " + rating);

        //make variables for still url and animated url

        var urlStill = results[i].images.fixed_height_still.url;
        var urlPlay = results[i].images.fixed_height.url;

        //gif needs still source to load, and data attributes to store the still and animated gifs for pausing function

        var gif = $("<img>")
          .addClass("gif")
          .attr("src", urlStill)
          .attr("data-still", urlStill)
          .attr("data-animate", urlPlay)
          .attr("data-state", "still");

        tvshowDiv.append(gif);
        tvshowDiv.append(pRate);

        $("#tvshows").append(tvshowDiv);
      }

      // on-click of gif still-image, gif will play. If clicked again, gif will stop.

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }

  //create buttons out of array indexes - gets information from JSON

  function renderButtons() {
    
    //delete original array of buttons so they do not repeat

    $("#tvshowButtons").empty();

    //loop through array

    for (var i = 0; i < topics.length; i++) {
      var tvshowRender = $("<button>");

      //add class and attribute of name so display function knows what to GET.

      tvshowRender.addClass("tvshow");
      tvshowRender.attr("tvshow-name", topics[i]);
      tvshowRender.text(topics[i]);
      $("#tvshowButtons").append(tvshowRender);
    }
  }

  // on-click event to add an additional tvshow button when submitted - push input to array.

  $("#addTvshow").on("click", function(event) {
    event.preventDefault();
    var tvshow = $("#input-tvshow")
      .val()
      .trim();

    //push input to topics array and then re-run render of buttons to display new button
    topics.push(tvshow);
    $("#input-tvshow").val(" ");
    renderButtons();
  });

  //on-click entire document to run display function
  $(document).on("click", ".tvshow", displayInfo);

  //run function to display all buttons on startup
  renderButtons();
});
