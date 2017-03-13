var title;
var link;
var savedTitle;
var savedLink;
$(function () { //Document ready

    $.get("/getArticles").done(function (result) {
        $.each(result, function (index, value) {
        });
    });

    $.get("/savedArticles").done(function(result) {
        console.log(result);
        $.each(result, function (index, value) {
                var title = value.title;
                var link = value.link;
                console.log(title);
                $("#articleSaved").append("<div class='well'><p><a href=" + link + " target='_blank'>" + title + "</a><button type='submit' class='saveBtn btn btn-default pull-right' type='submit'>Save</button></p></div>");
            }); //End each result
    });

    $("#articleAppend").empty();
    $(".navbar-btn").on("click", function () { //Click listener for "Scrape Articles"

        // Get Articles
        $.get("/getArticles").done(function (result) {
            $.each(result, function (index, value) {
                var title = value.title;
                var link = value.link;
                $("#articleAppend").append("<div class='well'><p><a href=" + link + " target='_blank'>" + title + "</a><button type='submit' class='saveBtn btn btn-default pull-right' type='submit'>Save</button></p></div>");
            }); //End each result
        }); //End get Route
    }); //End Scrape Articles click listener

    $(document).on("click", ".saveBtn", function () {
        var data = $(this)["0"].previousSibling;
        savedLink = $(data).attr('href');
        savedTitle = $(data).text();
        $.get("/savedArticles", {
            title: savedTitle,
            link: savedLink
        });
    });
}); //End document ready