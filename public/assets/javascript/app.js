$(function () { //Document ready
    // $("")
    $(".navbar-btn").on("click", function() { //Click listener for "Scrape Articles"
        // Get Articles
        $.post("/getArticles").done(function(result){
            $.each(result, function(index, value) {
                var title = value.title;
                var link = value.link;
                $("#articleAppend").append("<div class='well'><p>" + title + "</p><p>" + link + "</p><div>");
            }); //End each result
        }); //End get Route
    }); //End Scrape Articles click listener
}); //End document ready