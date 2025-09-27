 $(function() {
    $("button[id^='file']").on("dblclick", function() {
        const pdfFile = $(this).data("pdf");
        $("#pdfViewer").attr("src", pdfFile);
        $("#pdfOverlay").fadeIn(300);
      });

    $("#closePdf").on("click", function() {
        $("#pdfViewer").attr("src", "");
        $("#pdfOverlay").fadeOut(300);
      });

    $("#pdfOverlay").on("click", function(e) {
        if (e.target.id === "pdfOverlay") {
          $("#closePdf").click();
        }
      });
    });