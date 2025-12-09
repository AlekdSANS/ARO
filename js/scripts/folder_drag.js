$(function () {
  let isDragging = false;
  let currentFolder = null;
  let offsetX = 0;
  let offsetY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  // Get the selection box element
  const selectionBox = document.getElementById("selectionBox");

  $(
    ".main__folder-section-header1, .main__folder-section-header2, .main__user-header"
  ).on("mousedown", function (event) {
    event.preventDefault();

    isDragging = true;
    currentFolder = $(this).closest(
      ".main__folder-section1, .main__folder-section2, .main__user"
    );

    initialLeft = parseInt(currentFolder.css("left")) || 0;
    initialTop = parseInt(currentFolder.css("top")) || 0;

    offsetX = event.clientX - initialLeft;
    offsetY = event.clientY - initialTop;

    if (selectionBox) {
      selectionBox.style.display = "none";
    }

    currentFolder.css("z-index", "1");
    $(".main__folder-section1, .main__folder-section2, .main__user")
      .not(currentFolder)
      .css("z-index", "0");
  });

  $(document).on("mousemove", function (event) {
    if (isDragging && currentFolder) {
      event.preventDefault();

      let newX = event.clientX - offsetX;
      let newY = event.clientY - offsetY;

      // Get main section boundaries
      const mainSection = $(".main");
      const body = $("body");
      const bodyMarginTop = parseInt(body.css("marginTop")) || 0;
      const mainMarginTop = parseInt(mainSection.css("marginTop")) || 0;
      const mainMarginLeft = parseInt(mainSection.css("marginLeft")) || 0;

      const mainBounds = {
        left: mainSection.offset().left - mainMarginLeft - mainSection.width(),
        top: mainSection.offset().top - mainMarginTop - bodyMarginTop,
        right: mainSection.offset().left - mainMarginLeft + mainSection.width(),
        bottom:
          mainSection.offset().top -
          mainMarginTop -
          bodyMarginTop +
          mainSection.height(),
      };

      // Calculate boundaries within main section
      const maxX = mainBounds.right + currentFolder.outerWidth();
      const maxY = 935; // Bottom barrier to prevent going below footer
      const minX = mainBounds.left - currentFolder.outerWidth();
      const minY = mainBounds.top;

      // Constrain movement within main section bounds
      newX = Math.max(minX, Math.min(newX, maxX));
      newY = Math.max(minY, Math.min(newY, maxY));

      currentFolder.css({
        left: newX + "px",
        top: newY + "px",
      });
    }
  });
  $(document).on("mouseup", function () {
    isDragging = false;
    currentFolder = null;

    if (selectionBox) {
      selectionBox.style.display = "block";
    }
  });
});
