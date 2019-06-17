//call post route
$("#submit-form").on("submit", function(){
  var urls = {
    primaryPath: $("#url1").val(),
    secondPath: $("#url2").val()
  };

  $.ajax({
    type: "POST",
    url: "api/photos",
    data: urls
  }).then(function(){
    alert("Successfully submitted!")
  });
})