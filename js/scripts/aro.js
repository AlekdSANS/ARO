$(function(){
  const aro = $(".main__footer-section");

  aro.css({ 
    top: "60px",
    opacity: 0,
    "pointer-events": "none"
  });

  $("#aro").on("click", function(){
    if (aro.css("opacity") == 0){
      aro.css("pointer-events", "auto").animate(
        {top: "-60px", opacity: 1}, 700);
    }else{
      aro.animate(
        {top: "60px", opacity: 0}, 700, function(){
          aro.css("pointer-events", "none");
        }
      );
    }
  });
});