// =====================IMPORTANT Variables ==================
var apiKey = "&api_key=LlRQg08g43znkyLMjdumZmLCJQvFpkQ5&q=";
var nflTeams = ["Chicago Bears", "Cincinnati Bengals", " New England Patriots"]; // #1
// * limit: interger * will return a quantity of records (gifs) (default is 25)
// * rating: string * Filters results by specified rating
//========================================PSEUDO CODE============================================================
// 1. Create an array of NFL teams = DONE
// 2. Allow user to add a team to the array = DONE
// 3. Generate gifs once button is clicked
// 4. display 10 gifs per team
// 5. make gifs start/"stop" when clicked
//=================================================================================================================

// #2 ========
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
    console.log(nflTeams);

    generateButtons();
  });
}

generateButtons();
//#2 ^^^^^^ ========

// #3 ==============

$(document).on("click", ".team", displayNFLGifs);

function displayNFLGifs() {
  var team = $(this).attr("data-team");

  var apiURL = "https://api.giphy.com/v1/gifs/search?" + apiKey + team;

  $.ajax({
    url: apiURL,
    method: "GET"
  }).then(function(answer) {
    var teamUrl = answer.data.images.url;

    var teamImage = $("<img>");

    teamImage.attr("src", teamUrl);
    teamImage.attr("alt", "team image");
    console.log(teamImage);
    $("#gifs-appear-here").prepend(teamImage);
  });
}
displayNFLGifs();

// .then(function(answer){
//     $("#gifs-appear-here").text(JSON.stringify(answer));

//     var results = answer.data;

// for (var i = 0; i < results.length; i++) {

//     if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

//         var gifDiv = $("<div>");

//         var rating = results[i].rating;

// var p = $("<p>").text("Rating: " + rating);

// var teamImage = $("<img>");

// teamImage.attr("src", results[i].images.original.url);

// gifDiv.append(p);
// gifDiv.append(teamImage);

// $("#gifs-appear-here").prepend(gifDiv);

//             }
//         }
//     });
// });
