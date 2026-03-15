$(function () {
  const aro = $(".main__menu");

  aro.css({
    top: "80px",
    opacity: 0,
    "pointer-events": "none",
    "z-index": "0",
  });

  $("#aro").on("click", function () {
    if (aro.css("opacity") == 0) {
      aro
        .css("pointer-events", "auto")
        .animate({ top: "-110px", opacity: 1, "z-index": "9998" }, 500);
    } else {
      aro.animate(
        { top: "80px", opacity: 0, "z-index": "0" },
        500,
        function () {
          aro.css("pointer-events", "none");
        },
      );
    }
  });

  $(".main").on("click", function () {
    if (aro.css("opacity") == 1) {
      aro.animate(
        { top: "80px", opacity: 0, "z-index": "0" },
        500,
        function () {
          aro.css("pointer-events", "none");
        },
      );
    }
  });
});
