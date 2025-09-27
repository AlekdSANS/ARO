$(function() {
      const videoSources = {
        preview1: "./files/mp4/video1.mp4",
        preview2: "./files/mp4/video2.mp4",
        preview3: "./files/mp4/video3.mp4",
        preview4: "./files/mp4/video4.mp4"
      };

      $("button[id^='preview']").on("dblclick", function() {
        const btnId = $(this).attr("id");
        const videoFile = videoSources[btnId];

        if (videoFile) {
          $("#previewVideo").attr("src", videoFile);
          $("#videoOverlay").fadeIn(300);
          $("#previewVideo")[0].play();
        }
      });

      $("#closeBtn").on("click", function() {
        $("#previewVideo")[0].pause();
        $("#previewVideo").attr("src", "");
        $("#videoOverlay").fadeOut(300);
      });

      $("#videoOverlay").on("click", function(e) {
        if (e.target.id === "videoOverlay") {
          $("#closeBtn").click();
        }
      });
    });