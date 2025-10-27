$(function () {
  $(".main__folder-section1, .main__folder-section2").css("z-index", "0");

  $(".main__folder-section1, .main__folder-section2").on("click", function () {
    $(".main__folder-section1, .main__folder-section2").css("z-index", "0");
    $(this).css("z-index", "1");
  });
});
