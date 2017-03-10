var title;
var link;

$(function () { //Document ready
    
    $.get("/getArticles").done(function(result){
        console.log(result);
        $.each(result, function(index, value) {
            console.log(value)
        });
    });

    $("#articleAppend").empty();
    $(".navbar-btn").on("click", function() { //Click listener for "Scrape Articles"
        // Get Articles
        $.get("/getArticles").done(function(result){
            $.each(result, function(index, value) {
                var title = value.title;
                var link = value.link;
                $("#articleAppend").append("<div class='well'><p><a href=" + link + " target='_blank'>" + title + "</a><button type='submit' class='saveBtn btn btn-default pull-right' type='submit'>Save</button></p></div>");
            }); //End each result
        }); //End get Route
    }); //End Scrape Articles click listener

    $("#articleSaved").empty();
    $(document).on("click", ".saveBtn", function() {
        var data = $(this)["0"].previousSibling;
        var link = $(data).attr('href');
        var title = $(data).text();
        
    });
}); //End document ready