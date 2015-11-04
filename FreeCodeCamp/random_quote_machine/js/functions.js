$(document).ready(function () {

  //Call the Chuck Norris Jokes API
  function call_api_chuck () {
    $.ajax({
      //url: "http://quotesondesign.com/api/3.0/api-3.0.json",
      url: "http://api.icndb.com/jokes/random",
      jsonp: "callback",
      type: "GET",
      dataType: "jsonp",
      success: function (data) {
        $("#author").remove();
        $("#quote").append(data["value"]["joke"]);
      },
      xhrFields: {
        withCredentials: false
      }
    });
  };

  //Call the Mashable API with random quotes.
  //Not going to be used, just PoC.
  function call_api_boring () {
    var mashape_api_key = prompt("Enter here your Mashape API Key");

    if (mashape_api_key ===  null) {
      $("#quote").append("You did not provide an API Key you cheater :)");
    }

    else{
      $.ajax({
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies",
        type: "GET",
        dataType: "json",
        success: function (data) {
          $("#author").append(data["author"]);
          $("#quote").append(data["quote"]);
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("X-Mashape-Authorization", mashape_api_key);
        }
      });
    }
  }

  //By default the first quote displayed is a Chuck Norris' one.
  call_api_chuck();


  $("#chuckstuff").click(function (){
    $("#author").empty();
    $("#quote").empty();
    call_api_chuck();
  });

  $("#boringstuff").click(function (){
    $("#author").empty();
    $("#quote").empty();
    call_api_boring();
  });

  $("#tweet-button").click(function (){
    //window.open("https://twitter.com/intent/tweet?text=ABC");
    $(this).attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent($("#quote").text()) );
  });

});
