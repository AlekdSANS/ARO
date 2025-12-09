$(function () {
  const userApp = $(".main__user");

  userApp.css({
    scale: "0.1",
    width: "100px",
    height: "100px",
    left: "800px",
    top: "950px",
    opacity: 0,
    "pointer-events": "none",
  });

  $("#profileBtn, #closeUserProfile, #minimizeUserProfile").on(
    "click",
    function () {
      if (userApp.css("opacity") == 0) {
        userApp.css("pointer-events", "auto").animate(
          {
            top: "10px",
            left: "200px",
            width: "1160px",
            height: "800px",
            scale: "1",
            opacity: 1,
          },
          400
        );
      } else {
        userApp.animate(
          {
            top: "950px",
            left: "800px",
            width: "100px",
            height: "100px",
            scale: "0.1",
            opacity: 0,
          },
          400,
          function () {
            userApp.css("pointer-events", "none");
          }
        );
      }
    }
  );
});
