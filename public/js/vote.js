console.log("hi");

//function to display wins
var displayWins = function (left, right) {
  var leftPercent = (left / (left + right) * 100).toFixed(0);
  var rightPercent = (right / (left + right) * 100).toFixed(0);
  
  $("#leftwins").text(String(leftPercent) + "%");
  $("#rightwins").text(String(rightPercent) + "%");
}

//load first image
$.ajax({
  type: "GET",
  url: "api/photos"
}).then(function (data) {
  console.log(data);
  $("#leftimage").attr("src", data.primaryPath).attr("data-id", data.id).attr("data-wins", data.primaryWins);
  $("#rightimage").attr("src", data.secondPath).attr("data-id", data.id).attr("data-wins", data.secondWins);
  $("#opt1").attr("data-id", data.id).attr("data-wins", data.primaryWins);
  $("#opt2").attr("data-id", data.id).attr("data-wins", data.secondWins);
});

$("#nextbutton").on("click", function (event) {
  event.preventDefault();

  //call new random set of images
  $.ajax({
    type: "GET",
    url: "api/photos"
  }).then(function (data) {
    console.log(data);
    $("#leftimage").attr("src", data.primaryPath).attr("data-id", data.id).attr("data-wins", data.primaryWins);
    $("#rightimage").attr("src", data.secondPath).attr("data-id", data.id).attr("data-wins", data.secondWins);
    $("#opt1").attr("data-id", data.id).attr("data-wins", data.primaryWins);
    $("#opt2").attr("data-id", data.id).attr("data-wins", data.secondWins);

    //clear scores from prior images
    $("#leftwins").text("");
    $("#rightwins").text("");
  });
})

$(".left-vote").on("click", function (event) {
  event.preventDefault();

  var winner = {
    winner: "left",
    id: $("#leftimage").attr("data-id")
  }
  console.log(winner);


  $.ajax({
    type: "PUT",
    url: "api/photos",
    data: winner
  }).then(function (data) {
    console.log(data);
  }

  )
  displayWins($("#leftimage").attr("data-wins"), $("#rightimage").attr("data-wins"));
});

$(".right-vote").on("click", function (event) {
  event.preventDefault();

  var winner = {
    winner: "right",
    id: $("#rightimage").attr("data-id")
  }

  $.ajax({
    type: "PUT",
    url: "api/photos",
    data: winner
  }).then(function (data) {
    console.log(data);
  });
  displayWins($("#leftimage").attr("data-wins"), $("#rightimage").attr("data-wins"));
});
