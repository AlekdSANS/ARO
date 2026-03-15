$(function () {
  const internetApp = $(".main__internet");

  internetApp.css({
    scale: "0.1",
    width: "100px",
    height: "100px",
    left: "470px",
    top: "950px",
    opacity: 0,
    "pointer-events": "none",
  });

  $("#browserBtn, #closeInternet, #minimizeInternet, #app1").on(
    "click",
    function () {
      if (internetApp.css("opacity") == 0) {
        internetApp.css("pointer-events", "auto").animate(
          {
            top: "20px",
            left: "500px",
            width: "700px",
            height: "800px",
            scale: "1",
            opacity: 1,
          },
          400,
        );
      } else {
        internetApp.animate(
          {
            top: "950px",
            left: "470px",
            width: "100px",
            height: "100px",
            scale: "0.1",
            opacity: 0,
          },
          400,
          function () {
            internetApp.css("pointer-events", "none");
          },
        );
      }
    },
  );
});
