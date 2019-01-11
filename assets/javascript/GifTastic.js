// =====================Global Variables ==================
   var apiURL = "https://api.giphy.com/v1/gifs/search?q=";
   var apiKey = "&api_key=LlRQg08g43znkyLMjdumZmLCJQvFpkQ5";

// Key = LlRQg08g43znkyLMjdumZmLCJQvFpkQ5
// Path = GET /v1/gifs/search

// parameters = * q: string * will automatically generate the exact match of the search to queries
// * limit: interger * will return a quantity of records (gifs) (default is 25)
// * rating: string * Filters results by specified rating
//====================================================================================================

$("button").on("click", function(){
    var team = $(this).attr("data-team");

    apiURL + team + apiKey;

    $.ajax({
        url: apiURL,
        method: "GET"
    })

    .then(function(answer){

        var results = answer.data[0];

        for (var i = 0; i < results.length; i++) {

            if (results.rating !== "r" && results.rating !== "pg-13") {
                var gifDiv = $("<div>");

                var rating = results.rating;

                var p = $("<p>").text("Rating: " + rating);

                var teamImage = $("<img>");

                teamImage.attr("src", results.user.images.fixed_height_still.url);

                    gifDiv.append(p);
                    gifDiv.append(teamImage);

                    $("#gifs-appear-here").prepend(gifDiv);

            }
        }
    });
});