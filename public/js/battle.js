//call post route
$("#submit-form").on("submit", function(){
  var urls = {
    primaryPath: $("#url").val(),
    secondPath: $("#url1").val()
  };

  $.ajax({
    type: "POST",
    url: "api/photos",
    data: urls
  }).then(function(){
    alert("Successfully submitted!")
  });
})