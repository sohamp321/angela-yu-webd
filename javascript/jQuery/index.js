$(document).ready(function () {
  $("h1").css("color", "red");
});

$(document).keypress(function (e) {
  console.log(e.key);
  if (e.key === " ") {
    $("h1").text("Space");
  } else {
    $("h1").text(e.key);
  }
});

$("h1").on("mouseover", function() {
  $(this).css("color", "yellow");
});

