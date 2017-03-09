$(function () { //Document ready
    // $("")
    $(".navbar-btn").on("click", function() { //Click listener for "Scrape Articles"
        // Get Articles
        $.post("/getArticles").done(function(result){
            $.each(result, function(index, value) {
                console.log(value);
            }); //End each result
        }); //End get Route
    }); //End Scrape Articles click listener
}); //End document ready