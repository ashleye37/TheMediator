console.log("hi");


$("#leftimage").on("click", function (event) {
  event.preventDefault();
  console.log("hello!!!!");
  
  var winner = {
    winner: "left"
  }

  $.put("api/photos", winner).then(function (data) {
    console.log(data);
  }

  )
});

$("rightimage").on("click", function () {
  $.ajax({
    url: "api/photos",
    type: "PUT"
  });
});
