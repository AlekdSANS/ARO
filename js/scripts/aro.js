$(function () {
  const aro = $(".main__footer-section");

  aro.css({
    top: "60px",
    opacity: 0,
    "pointer-events": "none",
    "z-index": "0",
  });

  $("#aro").on("click", function () {
    if (aro.css("opacity") == 0) {
      aro
        .css("pointer-events", "auto")
        .animate({ top: "-60px", opacity: 1, "z-index": "9998" }, 500);
    } else {
      aro.animate(
        { top: "60px", opacity: 0, "z-index": "0" },
        500,
        function () {
          aro.css("pointer-events", "none");
        }
      );
    }
  });
});
