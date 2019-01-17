// =====================IMPORTANT Variables ==================
var apiKey = "&api_key=LlRQg08g43znkyLMjdumZmLCJQvFpkQ5&limit=5&q=";
var nflTeams = [
  "Chicago, Bears",
  "Cincinnati, Bengals",
  " New England, Patriots"
]; // #1
// * limit: interger * will return a quantity of records (gifs) (default is 25)
// * rating: string * Filters results by specified rating
//========================================PSEUDO CODE============================================================
// 1. Create an array of NFL teams = DONE
// 2. Allow user to add a team to the array = DONE
// 3. Generate gifs once button is clicked = DONE
// 4. display 5 gifs per team = DONE
// 5. make gifs start/"stop" when clicked
// 6. apply function to generated buttons = DONE
//=================================================================================================================

// #2 =============================================================================================================
function generateButtons() {
  // creating the button
  // create buttons here
  $("#buttons-container").empty(); // Delete the buttons prior to adding a new button

  for (var i = 0; i < nflTeams.length; i++) {
    // looping through the array of nflTeams

    var a = $("<button>");
    a.addClass("team");
    a.attr("data-team", nflTeams[i]);
    a.text(nflTeams[i]);
    $("#buttons-container").append(a);
  }

  $("#add-nflTeam").on("click", function(event) {
    // adding new button to nflTeams array
    event.preventDefault(); // clears the form

    var choosenTeam = $("#nfl-input")
      .val()
      .trim();

    nflTeams.push(choosenTeam);

    generateButtons();
  });

  // #2 =============================================================================================================

  // #3 =============================================================================================================

  $("button").on("click", function() {
    var team = $(this).attr("data-team");

    var apiURL = "https://api.giphy.com/v1/gifs/search?" + apiKey + team;

    $.ajax({
      url: apiURL,
      method: "GET"
    }).then(function(giphy) {
      //console.log(giphy);
      var teamUrl = giphy.data;
      //console.log(teamUrl);

      for (var i = 0; i < teamUrl.length; i++) {
        if (teamUrl[i].rating !== "r") {
          var gifDiv = $("<div>");

          var rating = teamUrl[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var teamImage = $("<img>");
          teamImage.attr(
            "data-still",
            teamUrl[i].images.fixed_height_still.url
          );
          teamImage.attr("data-animated", teamUrl[i].images.original.url);
          teamImage.attr("data-state", "still");
          teamImage.addClass("gif");

          teamImage.attr("src", teamUrl[i].images.original.url);

          gifDiv.append(p);
          gifDiv.append(teamImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      }

      $(document).on("click", ".gif", function() {
        //console.log("test");
        var state = $(this).attr("data-state");
        //console.log(state)
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animated"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  });
}

generateButtons();
