document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".target");
  let draggedElement = null;
  let initialPosition = null;
  let isSticky = false;
  let offsetX = 0;
  let offsetY = 0;

  targets.forEach((target) => {
    const startDrag = (event, touch = false) => {
      const pointerX = touch ? event.touches[0].clientX : event.clientX;
      const pointerY = touch ? event.touches[0].clientY : event.clientY;

      if (!isSticky) {
        draggedElement = target;
        initialPosition = { top: target.offsetTop, left: target.offsetLeft };

        offsetX = pointerX - target.offsetLeft;
        offsetY = pointerY - target.offsetTop;

        const moveHandler = (moveEvent) => {
          const moveX = touch ? moveEvent.touches[0].clientX : moveEvent.clientX;
          const moveY = touch ? moveEvent.touches[0].clientY : moveEvent.clientY;

          if (draggedElement) {
            draggedElement.style.top = `${moveY - offsetY}px`;
            draggedElement.style.left = `${moveX - offsetX}px`;
          }
        };

        const endHandler = () => {
          draggedElement = null;
          document.removeEventListener(touch ? "touchmove" : "mousemove", moveHandler);
          document.removeEventListener(touch ? "touchend" : "mouseup", endHandler);
        };

        document.addEventListener(touch ? "touchmove" : "mousemove", moveHandler);
        document.addEventListener(touch ? "touchend" : "mouseup", endHandler, {
          once: true,
        });
      } else {
        isSticky = false;
        draggedElement.style.backgroundColor = "red";
        draggedElement = null;
      }
    };

    const startStickyDrag = (event, touch = false) => {
      if (!isSticky) {
        const pointerX = touch ? event.touches[0].clientX : event.clientX;
        const pointerY = touch ? event.touches[0].clientY : event.clientY;

        isSticky = true;
        draggedElement = target;
        initialPosition = { top: target.offsetTop, left: target.offsetLeft };
        target.style.backgroundColor = "blue";

        offsetX = pointerX - target.offsetLeft;
        offsetY = pointerY - target.offsetTop;

        const moveHandler = (moveEvent) => {
          const moveX = touch ? moveEvent.touches[0].clientX : moveEvent.clientX;
          const moveY = touch ? moveEvent.touches[0].clientY : moveEvent.clientY;

          if (isSticky && draggedElement) {
            draggedElement.style.top = `${moveY - offsetY}px`;
            draggedElement.style.left = `${moveX - offsetX}px`;
          }
        };

        document.addEventListener(touch ? "touchmove" : "mousemove", moveHandler);
      }
    };

    target.addEventListener("mousedown", (event) => startDrag(event));
    target.addEventListener("touchstart", (event) => startDrag(event, true));

    target.addEventListener("dblclick", (event) => startStickyDrag(event));
    target.addEventListener("touchstart", (event) => {
      if (event.detail === 2) {
        startStickyDrag(event, true);
      }
    });
  });

  document.addEventListener("touchstart", (event) => {
    // Снять выделение только при касании выделенного объекта
    if (draggedElement && event.target === draggedElement) {
      resetDrag();
    }
  });

  const resetDrag = () => {
    if (draggedElement) {
      draggedElement.style.top = `${initialPosition.top}px`;
      draggedElement.style.left = `${initialPosition.left}px`;
      draggedElement.style.backgroundColor = "red";
      draggedElement = null;
      isSticky = false;
    }
  };
});
