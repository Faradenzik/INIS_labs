document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".target");
    let draggedElement = null;
    let initialPosition = null;
    let isSticky = false;
    let offsetX = 0;
    let offsetY = 0;
  
    targets.forEach((target) => {
      target.addEventListener("mousedown", (event) => {
        if (!isSticky) {
          draggedElement = target;
          initialPosition = { top: target.offsetTop, left: target.offsetLeft };
  
          offsetX = event.clientX - target.offsetLeft;
          offsetY = event.clientY - target.offsetTop;
  
          const mouseMoveHandler = (moveEvent) => {
            if (draggedElement) {
              draggedElement.style.top = `${moveEvent.clientY - offsetY}px`;
              draggedElement.style.left = `${moveEvent.clientX - offsetX}px`;
            }
          };
  
          document.addEventListener("mousemove", mouseMoveHandler);
  
          document.addEventListener(
            "mouseup",
            () => {
              draggedElement = null;
              document.removeEventListener("mousemove", mouseMoveHandler);
            },
            { once: true }
          );
        } else {
          isSticky = false;
          draggedElement.style.backgroundColor = "red";
          draggedElement = null;
        }
      });
  
      target.addEventListener("dblclick", (event) => {
        if (!isSticky) {
          isSticky = true;
          draggedElement = target;
          initialPosition = { top: target.offsetTop, left: target.offsetLeft };
          target.style.backgroundColor = "blue";
  
          offsetX = event.clientX - target.offsetLeft;
          offsetY = event.clientY - target.offsetTop;
  
          const mouseMoveHandler = (moveEvent) => {
            if (isSticky && draggedElement) {
              draggedElement.style.top = `${moveEvent.clientY - offsetY}px`;
              draggedElement.style.left = `${moveEvent.clientX - offsetX}px`;
            }
          };
  
          document.addEventListener("mousemove", mouseMoveHandler);
        }
      });
    });
  
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && draggedElement) {
        draggedElement.style.top = `${initialPosition.top}px`;
        draggedElement.style.left = `${initialPosition.left}px`;
        draggedElement.style.backgroundColor = "red"; // Возвращаем цвет
        draggedElement = null;
        isSticky = false;
      }
    });
  });
  