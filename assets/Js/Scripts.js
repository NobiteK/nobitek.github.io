// Clearing Console
setInterval(function() {
  console.clear();
}, 2000);

// Click Sound
var audio = new Audio("assets/Others/Click.wav");
document.onclick = function() {
  audio.volume = 0.2;
  audio.play();
};

// Setup Button
var collapsibleButton = document.querySelector('.collapsible-button');
var contentBox = document.querySelector('.content-box');
collapsibleButton.addEventListener('click', function() {
  if (contentBox.style.display === 'block') {
    contentBox.style.display = 'none';
  } else {
    contentBox.style.display = 'block';
  }
});
var closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', function() {
  contentBox.style.display = 'none';
});

// Mobile Resizer
function toggleContent() {
  var mobileContent = document.getElementById('mobileContent');
  var desktopContent = document.getElementById('desktopContent');
  var screenWidth = window.innerWidth;
  if (screenWidth <= 768) { // Assuming 768px is the breakpoint for mobile devices
    mobileContent.style.display = 'block';
    desktopContent.style.display = 'none';
  } else {
    mobileContent.style.display = 'none';
    desktopContent.style.display = 'block';
  }
}
toggleContent();
window.addEventListener('resize', toggleContent);

// Refresh Lanyard Images
function refreshLanyardImages() {
  var lanyardImage1 = document.getElementById('lanyardImage1');
  var lanyardImage2 = document.getElementById('lanyardImage2');
  var timestamp = new Date().getTime();
  lanyardImage1.src = "https://lanyard-profile-readme.vercel.app/api/430436408386125824?timestamp=" + timestamp;
  lanyardImage2.src = "https://lanyard-profile-readme.vercel.app/api/430436408386125824?timestamp=" + timestamp;
}
setInterval(refreshLanyardImages, 3000); // Refresh every 3 seconds

// Refresh Cameras Images
function refreshImages() {
  var image1 = document.getElementById('image1');
  var image2 = document.getElementById('image2');
  var image3 = document.getElementById('image3');
  var timestamp = new Date().getTime();
  image1.src = "https://aero.webcam/cam/epsu-1.jpg?timestamp=" + timestamp;
  image2.src = "https://aero.webcam/cam/epsu-2.jpg?timestamp=" + timestamp;
  image3.src = "https://aero.webcam/cam/epsu-3.jpg?timestamp=" + timestamp;
}
setInterval(refreshImages, 60000); // Refresh every 60 seconds

// Activity Logger
const webhookUrl = 'https://discord.com/api/webhooks/826139686366871642/wIL_mOMNXwrjAS5-J1qN2W0ORK5DT-fIkjMOs_f1wBnrnBzXGIWaW4izu-oxrAqeuqdv';

function getBrowserAndOS() {
  const ua = navigator.userAgent;
  let browser = 'Unknown Browser', os = '❌';

  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("MSIE") || ua.includes("Trident")) browser = "Explorer";

  // Detect operating system
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "IOS";
  else if (ua.includes("Mac")) os = "MacOS";

  return { browser, os };
}

// Function to send message to Discord webhook
function sendMessageToDiscord(message, buttonName = '') {
  const { browser, os } = getBrowserAndOS();
  const referrer = document.referrer || '❌';
  const screenResolution = `${screen.width}x${screen.height}`;
  const request = new XMLHttpRequest();
  request.open("POST", webhookUrl);
  request.setRequestHeader('Content-type', 'application/json');

  const embeds = [{
    "title": "🔔 New Website Activity",
    "description": message,
    "color": parseInt("5d35b2", 16),
    "fields": [
      {
        "name": "\u2003", // Em Space character for a slightly larger blank field
        "value": "\u2003",
        "inline": false
      },
      {
        "name": "🕒 Timestamp",
        "value": new Date().toLocaleString(),
        "inline": false
      },
      {
        "name": "🌐 Browser",
        "value": browser,
        "inline": true
      },
      {
        "name": "🖥️ System",
        "value": os,
        "inline": true
      },
      {
        "name": "📏 Resolution",
        "value": screenResolution,
        "inline": false
      },
      {
        "name": "🔗 Referrer",
        "value": referrer,
        "inline": false
      }
    ]
  }];

  // Add button name field only if buttonName is provided
  if (buttonName) {
    embeds[0].fields.unshift({
      "name": "🔗 **Button Clicked**",
      "value": buttonName,
      "inline": true
    });
  }

  const params = {
    username: "Website Notification Bot",
    avatar_url: "https://nobitek.pl/assets/Images/Icon.png",
    embeds: embeds
  };

  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      const responseStatus = request.status;
      if (responseStatus !== 204) {
        console.error('Failed to send message to webhook:', responseStatus);
      }
    }
  };

  request.send(JSON.stringify(params));
}

function isDevToolsOpen() {
  const threshold = 160;
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  return widthThreshold || heightThreshold;
}

setInterval(() => {
  if (isDevToolsOpen() && !devToolsMessageSent) {
    sendMessageToDiscord('🛠️ **Someone opened Developer Tools on the website!**');
    devToolsMessageSent = true; // Set the flag to true after sending the message
  }
}, 1000);

window.addEventListener('resize', () => {
  if (!isDevToolsOpen()) {
    devToolsMessageSent = false;
  }
});

window.onload = function() {
  sendMessageToDiscord('👤 **Someone has entered the website!**');
};

const buttons = document.querySelectorAll('a.button');
buttons.forEach(button => {
  button.addEventListener('click', function() {
    const buttonName = this.classList.contains('discord') ? 'Discord' :
                       this.classList.contains('instagram') ? 'Instagram' :
                       this.classList.contains('youtube') ? 'YouTube' :
                       this.classList.contains('steam') ? 'Steam' :
                       this.classList.contains('spotify') ? 'Spotify' :
                       this.classList.contains('twitch') ? 'Twitch' : 'Unknown';
    sendMessageToDiscord('', buttonName);
  });
});
