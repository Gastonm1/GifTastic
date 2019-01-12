// =====================IMPORTANT Variables ==================
   var apiKey = "&api_key=LlRQg08g43znkyLMjdumZmLCJQvFpkQ5";
    var q = "q=Chicago Bears"; 

// * limit: interger * will return a quantity of records (gifs) (default is 25)
// * rating: string * Filters results by specified rating
//========================================PSEUDO CODE============================================================
// Create an array of NFL teams
// Allow user to add a team to the array
// display 10 gifs per team
// make gifs start/"stop" when clicked

var nflTeams = ["The Chicago Bears", "The Cincinnati Bengals", " The New England Patriots"];

    function displayNFLGifs() {

        var team = $(this).attr("data-team");

        var apiURL = "https://api.giphy.com/v1/gifs/search?q=" + team + apiKey;
    
        $.ajax({
            url: apiURL,
            method: "GET"
        })
    
        .then(function(answer){
            $("#gifs-appear-here").text(JSON.stringify(answer));
        });
    }

    function generateButtons() {
        $("#buttons-container").empty();

        for (var i = 0; i < nflTeams.length; i++){

            var a = $("<button>");
            a.addClass("team");
            a.attr("data-team", nflTeams[i]);
            a.text(nflTeams[i]);
            $("#buttons-container").append(a);
        }
    }



//======================================================================================================
$("button").on("click", function(){
    var team = $(this).attr("data-team");

    var apiURL = "https://api.giphy.com/v1/gifs/search?q=" + team + apiKey;

    $.ajax({
        url: apiURL,
        method: "GET"
    })

    .then(function(answer){
        $("#gifs-appear-here").text(JSON.stringify(answer));
    });
}
        var results = answer.data;

        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var teamImage = $("<img>");

                teamImage.attr("src", results[i].images.original.url);

                    gifDiv.append(p);
                    gifDiv.append(teamImage);

                    $("#gifs-appear-here").prepend(gifDiv);

            }
        }
    });
});