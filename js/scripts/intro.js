    document.addEventListener("DOMContentLoaded", function() {
      const intro = document.getElementById("intro");
      const introVideo = document.getElementById("introVideo");
      const content = document.getElementById("content");

      if (sessionStorage.getItem("introPlayed")) {
        intro.classList.add("hidden");
        content.classList.add("show");
      } else {
        introVideo.play().catch(err => {
          console.warn("Autoplay with sound blocked:", err);

          const playBtn = document.createElement("button");
          playBtn.id = "playBtn";
          playBtn.textContent = "Play Intro";
          document.body.appendChild(playBtn);

          playBtn.addEventListener("click", () => {
            introVideo.play();
            playBtn.remove();
          });
        });

        introVideo.addEventListener("ended", () => {
          intro.classList.add("fade-out");

          setTimeout(() => {
            intro.classList.add("hidden");
            content.classList.add("show");
          }, 1000);

          sessionStorage.setItem("introPlayed", "true");
        });
      }
    });