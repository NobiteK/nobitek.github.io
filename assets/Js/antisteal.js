window.onload = function () {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    showNotification("Nuh Uh");
  }, false);

  document.addEventListener("keydown", function (e) {
    //  Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
      disabledEvent(e);
    }
    // Ctrl + Shift + J
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
      disabledEvent(e);
    }
    // Ctrl + Shift + C
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      disabledEvent(e);
    }
    // "S" key + macOS
    if (e.key === "S" && (navigator.userAgent.includes("Mac") ? e.metaKey : e.ctrlKey)) {
      disabledEvent(e);
    }
    // Ctrl + U (Source)
    if (e.ctrlKey && e.key === "U") {
      disabledEvent(e);
    }
    // Ctrl + I (Mozilla Site Info)
    if (e.ctrlKey && e.key === "I") {
      disabledEvent(e);
    }
    // F12
    if (e.key === "F12") {
      disabledEvent(e);
    }
  }, false);

  function disabledEvent(e) {
    e.stopPropagation();
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
