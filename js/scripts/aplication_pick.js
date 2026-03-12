$(function () {
  $(".main__folder-section1, .main__folder-section2, .main__user").css(
    "z-index",
    "0",
  );

  $(".main__folder-section1, .main__folder-section2, .main__user").on(
    "click",
    function () {
      $(".main__folder-section1, .main__folder-section2, .main__user").css(
        "z-index",
        "0",
      );
      $(this).css("z-index", "1");
    },
  );
});
