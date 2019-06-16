console.log("hi");

//function to display wins
var displayWins = function(left, right) {
  $("#leftwins").text(String(left));
  $("#rightwins").text(String(right));
}

//load first image
$.ajax({
  type: "GET",
  url: "api/photos"
}).then(function(data){
  console.log(data);
  $("#leftimage").attr("src", data.primaryPath).attr("data-id", data.id).attr("data-wins", data.primaryWins);
  $("#rightimage").attr("src", data.secondPath).attr("data-id", data.id).attr("data-wins", data.secondWins);
  
})

$("#leftimage").on("click", function (event) {
  event.preventDefault();
  console.log("hello!!!!");

  var winner = {
    winner: "left",
    id: $(this).data("id")
  }
  console.log(winner);
  

  $.ajax({
    type: "PUT",
    url: "api/photos",
    data: winner
  }).then(function (data) {
    console.log(data);
    displayWins($("#leftimage").data("wins"), $("#rightimage").data("wins"));
  }

  )
});

$("#rightimage").on("click", function () {
  var winner = {
    winner: "right",
    id: $(this).data("id")
  }
  console.log("right won");
  

  $.ajax({
    type: "PUT",
    url: "api/photos",
    data: winner
  }).then(function (data) {
    console.log(data);
    displayWins($("#leftimage").data("wins"), $("#rightimage").data("wins"));
  })
});
