(function () {
  // Create selection box if not present
  let selectionBox = document.getElementById("selectionBox");
  if (!selectionBox) {
    selectionBox = document.createElement("div");
    selectionBox.id = "selectionBox";
    document.body.appendChild(selectionBox);
  }

  let isSelecting = false;
  let startX = 0,
    startY = 0;
  let activePointerId = null;
  let captureElement = null;

  function shouldIgnoreStart(target) {
    // ignore if clicking on interactive controls so they behave normally
    return !!target.closest(
      'input, textarea, button, select, a, [contenteditable="true"]'
    );
  }

  function startSelection(e) {
    // only start on primary button
    if (e.button !== undefined && e.button !== 0) return;
    if (shouldIgnoreStart(e.target)) return;

    isSelecting = true;
    activePointerId = e.pointerId || null;
    captureElement = e.target;

    startX = e.clientX;
    startY = e.clientY;

    selectionBox.style.left = startX + "px";
    selectionBox.style.top = startY + "px";
    selectionBox.style.width = "0px";
    selectionBox.style.height = "0px";
    selectionBox.style.display = "block";

    // try to capture pointer so we get events even if pointer leaves the window
    try {
      if (activePointerId != null && captureElement.setPointerCapture) {
        captureElement.setPointerCapture(activePointerId);
      }
    } catch (err) {
      /* ignore if not allowed */
    }

    // add move/up handlers (pointer events)
    if (window.PointerEvent) {
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", endSelection);
      document.addEventListener("pointercancel", endSelection);
    } else {
      // fallback to mouse events
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", endSelection);
    }

    // safety listeners
    window.addEventListener("blur", endSelection);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("keydown", onKeyDown);
  }

  function onMove(e) {
    // if pointerId exists, ignore events from other pointers
    if (!isSelecting) return;
    if (
      activePointerId != null &&
      e.pointerId != null &&
      e.pointerId !== activePointerId
    )
      return;

    const curX = e.clientX;
    const curY = e.clientY;

    const x = Math.min(curX, startX);
    const y = Math.min(curY, startY);
    const w = Math.abs(curX - startX);
    const h = Math.abs(curY - startY);

    selectionBox.style.left = x + "px";
    selectionBox.style.top = y + "px";
    selectionBox.style.width = w + "px";
    selectionBox.style.height = h + "px";
  }

  function cleanupListeners() {
    if (window.PointerEvent) {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", endSelection);
      document.removeEventListener("pointercancel", endSelection);
    } else {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", endSelection);
    }
    window.removeEventListener("blur", endSelection);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    document.removeEventListener("keydown", onKeyDown);
  }

  function endSelection(e) {
    if (!isSelecting) return;
    // if pointerId exists, ensure matching pointer (but still allow timeout/cancel)
    if (
      activePointerId != null &&
      e &&
      e.pointerId != null &&
      e.pointerId !== activePointerId
    ) {
      // ignore other pointers
      return;
    }

    isSelecting = false;
    selectionBox.style.display = "none";
    selectionBox.style.width = "0px";
    selectionBox.style.height = "0px";

    // release pointer capture if we set it
    try {
      if (
        activePointerId != null &&
        captureElement &&
        captureElement.releasePointerCapture
      ) {
        captureElement.releasePointerCapture(activePointerId);
      }
    } catch (err) {
      /* ignore */
    }

    activePointerId = null;
    captureElement = null;
    cleanupListeners();
  }

  function onVisibilityChange() {
    if (document.hidden) endSelection();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") endSelection();
  }

  // Start on pointerdown (or mousedown fallback)
  if (window.PointerEvent) {
    document.addEventListener("pointerdown", startSelection);
  } else {
    document.addEventListener("mousedown", startSelection);
  }

  // Extra defensive hide: if the user resizes or scrolls drastically, hide the box
  window.addEventListener("resize", () => {
    if (isSelecting) endSelection();
  });
  window.addEventListener(
    "scroll",
    () => {
      if (isSelecting) endSelection();
    },
    true
  );
})();
