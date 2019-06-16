console.log("hi");

$("#leftimage").on("click", function (event) {
  event.preventDefault();
  console.log("hello!!!!");

  var winner = {
    winner: "left"
  }

  $.ajax({
    type: "PUT",
    url: "api/photos",
    data: winner
  }).then(function (data) {
    console.log(data);
  }

  )
});

$("rightimage").on("click", function () {
  var winner = {
    winner: "right"
  }

  $.ajax({
    type: "PUT",
    url: "api/photos",
    data: winner
  }).then(function (data) {
    console.log(data);
  }
});
