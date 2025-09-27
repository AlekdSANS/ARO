$(function() {
      const audioSources = {
        sound1: "./files/mp3/audio1.mp3",
        sound2: "./files/mp3/audio2.mp3",
        sound3: "./files/mp3/audio3.mp3"
      };

      $("button[id^='sound']").on("dblclick", function() {
        const btnId = $(this).attr("id");
        const audioFile = audioSources[btnId];

        if (audioFile) {
          $("#previewAudio").attr("src", audioFile);
          $("#audioTitle").text("Now Playing: " + btnId);
          $("#audioOverlay").fadeIn(300);
          $("#previewAudio")[0].play();
        }
      });

      $("#closeBtn").on("click", function() {
        $("#previewAudio")[0].pause();
        $("#previewAudio").attr("src", "");
        $("#audioOverlay").fadeOut(300);
      });

      $("#audioOverlay").on("click", function(e) {
        if (e.target.id === "audioOverlay") {
          $("#closeBtn").click();
        }
      });
    });