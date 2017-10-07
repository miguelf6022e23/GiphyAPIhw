var topics = ["fight club", "apocalypse now", "james bond", "terminator","predator","alien","star wars","star trek","guardians of the galaxy"]
var btnCont = $("#topic-buttons");
var gifs = $("#container");
addBtn();

$(document).on('click', '.gif', function() {

    var img = $(this).children("img");
    var staticUrl = img.data("static");
    var animatedUrl = img.data("animate");
    var state = img.data("state");

    if (state === "static") {
        img.attr("src", animatedUrl);
        img.data("state", "animate");
    }
    if (state === "animate") {
        img.attr("src", staticUrl);
        img.data("state", "static");
    }
});

function addBtn(a) {

    btnCont.empty();
    for (topic in topics) {
        var btnTopic = $("<div class='btn topic'>");
        btnTopic.text(topics[topic]);
        btnTopic.attr("data-value", topics[topic]);

        btnCont.append(btnTopic);
    }
}

$(document).on('click', '.topic', function() {
    var randomNum = Math.floor((Math.random() * 20) + 0)
    var tempTopic = $(this).data("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tempTopic + "&offset=" + randomNum + "&api_key=0abc950e61194a8792b03c90afa6fa7d&limit=10";

    gifs.empty();

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(res, err) {
            var r = res.data;

            for (a in r) {
                var static = r[a].images.fixed_height_still.url;
                var animated = r[a].images.fixed_height.url;
                var rating = r[a].rating;

                var imgDiv = $("<div class='gif'>");
                var ratingP = $("<p>");
                ratingP.text("Rating: " + rating);
                var img = $("<img>").attr({ "src": static, "data-static": static, "data-animate": animated, "data-state": "static" });
                imgDiv.append(ratingP, img);
                gifs.append(imgDiv);
            }
        })
});

$("#submit").on('click', function(e) {
    e.preventDefault();
    var temp = $("#form-text").val();
    if (!temp) {
        console.log("Please enter a topic!");
    } else if (topics.indexOf(temp) !== -1) {
		console.log("Topic already exists");
    } else {
        topics.push(temp);
        addBtn(temp);
    }
});


