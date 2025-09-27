$(function(){
  const folder1 = $(".main__folder-section");

  folder1.css({ 
    scale: "0.1",
    width: "100px",
    height: "100px",
    left: "100px",
    top: "50px",
    opacity: 0,
    "pointer-events": "none"
  });

  $("#folder1").on("click", function(){
    if (folder1.css("opacity") == 0){
      folder1.css("pointer-events", "auto").animate(
        {top: "100px", left: "700px", width: "1160px", height: "800px", scale: "1", opacity: 1}, 400);
    }else{
      folder1.animate(
        {top: "50px", left: "100px", width: "100px", height: "100px", scale: "0.1", opacity: 0}, 400, function(){
          folder1.css("pointer-events", "none");
        }
      );
    }
  });
});