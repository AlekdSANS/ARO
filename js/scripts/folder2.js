$(function () {
  const folder2 = $(".main__folder-section2");

  folder2.css({
    scale: "0.1",
    width: "100px",
    height: "100px",
    left: "100px",
    top: "150px",
    opacity: 0,
    "pointer-events": "none",
  });

  $("#folder2").on("click", function () {
    if (folder2.css("opacity") == 0) {
      folder2.css("pointer-events", "auto").animate(
        {
          top: "60px",
          left: "600px",
          width: "1160px",
          height: "800px",
          scale: "1",
          opacity: 1,
        },
        400
      );
    } else {
      folder2.animate(
        {
          top: "150px",
          left: "100px",
          width: "100px",
          height: "100px",
          scale: "0.1",
          opacity: 0,
        },
        400,
        function () {
          folder2.css("pointer-events", "none");
        }
      );
    }
  });
});
