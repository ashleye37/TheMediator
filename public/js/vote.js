console.log("hi");

//load first image
$.ajax({
  type: "GET",
  url: "api/photos"
}).then(function(data){
  console.log(data);
  $("#leftimage").attr("src", data.primaryPath).attr("data-id", data.id);
  $("#rightimage").attr("src", data.secondPath).attr("data-id", data.id);
  
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
  }

  )
});

$("rightimage").on("click", function () {
  var winner = {
    winner: "right",
    id: $(this).data("id")
  }

  $.ajax({
    type: "PUT",
    url: "api/photos",
    data: winner
  }).then(function (data) {
    console.log(data);
  })
});
