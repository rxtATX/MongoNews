$(function () { //Document ready
    // $("")
    $(".navbar-btn").on("click", function() { //Click listener for "Scrape Articles"
        $("#articleAppend").empty();
        // Get Articles
        $.post("/getArticles").done(function(result){
            $.each(result, function(index, value) {
                var title = value.title;
                var link = value.link;
                var buttons = $('<button type="submit" class="btn btn-success btn-block">Save</button>');
                $("#articleAppend").append("<div class='well'><p><a href=" + link + " target='_blank'>" + title + "</a><button type='submit' class='btn btn-default pull-right' type='submit'>Save</button></p></div>");
            }); //End each result
        }); //End get Route
    }); //End Scrape Articles click listener
}); //End document ready