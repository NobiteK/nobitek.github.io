window.onload = function () {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      showNotification("Nuh Uh");
    }, false);

    document.addEventListener("keydown", function (e) {
      //  Ctrl + Shift + I
      if (e.ctrlKey && e.shiftKey && e.key == 73) {
        disabledEvent(e);
      }
      // Ctrl + Shift + J
      if (e.ctrlKey && e.shiftKey && e.key == 74) {
        disabledEvent(e);
      }
      // Ctrl + Shift + C
      if (e.ctrlKey && e.shiftKey && e.key == 67) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.key == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // Ctrl + U (Source)
      if (e.ctrlKey && e.key == 85) {
        disabledEvent(e);
      }
      // Ctrl + I (Mozilla Site Info)
      if (e.ctrlKey && e.key == 73) {
        disabledEvent(e);
      }
      // F12
      if (e.key == 123) {
        disabledEvent(e);
      }
    }, false);

    function disabledEvent(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      showNotification("Nuh Uh");
      return false;
    }

    function showNotification(message) {
      var notification = document.getElementById("notification");
      notification.textContent = message;
      notification.style.transform = "translateY(0%)";
      notification.style.opacity = "1";
      setTimeout(function () {
        notification.style.transform = "translateY(100%)";
        notification.style.opacity = "0";
      }, 2000);
    }
  }
