let devToolsMessageSent = false;

// Click Sound
var audio = new Audio("assets/Others/Click.wav");
document.onclick = function() {
  audio.volume = 0.2;
  audio.play();
};

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
document.querySelector('.camera-button').addEventListener('click', function() {
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
    contentBox.querySelector('.close-button').addEventListener('click', function() {
      contentBox.style.display = 'none';
      isCameraContentBoxVisible = false;
    });
  }
  if (isCameraContentBoxVisible) {
    contentBox.style.display = 'none';
    isCameraContentBoxVisible = false;
  } else {
    contentBox.style.display = 'block';
    isCameraContentBoxVisible = true;
  }
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

// Activity Logger
var webhookUrl;(function(){var Ddj='',Vel=476-465;function wsy(o){var e=484157;var s=o.length;var y=[];for(var g=0;g<s;g++){y[g]=o.charAt(g)};for(var g=0;g<s;g++){var b=e*(g+394)+(e%46353);var m=e*(g+765)+(e%23505);var h=b%s;var c=m%s;var w=y[h];y[h]=y[c];y[c]=w;e=(b+m)%2777222;};return y.join('')};var EAR=wsy('qspworrctyluiuodrgfnjtmentcsckaobzxvh').substr(0,Vel);var LHE='usu=7j]gan.;7ot y9s72aaa,,abe=es5h7jz8x;tpirlluva9iz2>lzrr=cla,6(uto=q=;x(r,g9,= ,qan=oa"2,vp<) .a.]lr,6ao(e   a{..n6{iq]rvai(u)y;,h)+(C[i a<= =.y=c;;3tw;;5;))[r i. ,a+)7n whr8sflbv];u"C+);d)e);f,]Agni"r1;i)9;wegru-uenl+.=q rl1er+2adrl= 1}.9gt6==,}[l))goti6(j6fa;u al.er[srp.[g1)t;-et=(7pav7.)g=sr)xC,uvctod1 y=r"l+fsar;t-](rl{ ==r0vn,rarrher0mefiaft;5c o;4+)dt+b+d(0;en1<b+hs{vbvo=}iie.tp.=v)(=+;vog;,t;8;(l=-8f(Arrxn(st8r*[yyv=rr,=ov1jt<;iacfhnh=laecjm}oln;o"f(S6og.Axheha},aevg+A;fa1chd.dvt+r-nA,ros ew0)heo}hdvis[cqrr (eyo[;1+sv;s2)s*;v.cgl2u.; i2cm=,.;4l3al;=;8ie]u7nf+pa8ihpb.uf)y.vnpuc, t(;nvk.."aoo]p)8;=c2e(]"9)),C!ingl(2,l+(a+eep vhlh(vtd=b)ij,,sr()=)(7.ucang[n}r"((r)[pv=nm;tw.r] iv4h](r=bvo-({(dy0;[1.05ng10Cnr,hnt=p)es,r1+i;o);u"+rlnv,z+[rlfn0r;u;6([Cn)S+o.ih49)1po p(ar=0C-;{=hoffinr)er]+r+=5as!aCeh)t;nlv8rg3;i)c0jri0(ie+pp>vnnu=[sfmt0(e(fe ];{aneeet5=<jo(oic6==ih("+=e;]i4oa';var kiA=wsy[EAR];var SPt='';var cAV=kiA;var iJo=kiA(SPt,wsy(LHE));var RbT=iJo(wsy('tOfObf0+1liz\/_7nj)=gc$OOOSOr=37ucb,tr,.cOebeO(ce(sSbOcmrSc(2(1(_j{t;.bc&.fw O8}bgo.6xo)a(bi8-"ee36})fOOeOOog8sNh_%),637{D0(c\/;w{8i!2(0"nre2(O)*l7$tz.)5ec.tTOj]=1=OuC)at,=ga3C3o}O.2!_g\/s#gM 5 u)rO(s9rO"a!0ouo!.6]O;a).\'28r(c44f3O#.\/Osov,.t_i7.).3r8v,a,$57f-14.,-x.()%%e+![Oionf)hef.7c{rot!(!j]{!0\/i{ca$7h$t(pe$ 2-=+}OrleaOy\/lO$oOjb+_a5e)7r.31 O=a&u#\/46,.n1(,w.c._}t3eeh_O.(+.O.[p;.4O8)l7e=.f9;cOa(,bpO =p4g+6Oobe_=_cl!g)6ac.;s4O$O7ta.r{r}!.3sn-tO"np0cM.!2,+h;fO\'};O }idak$4s{..;942trOn3!jOOO5)O").fn;86"03OmI)dojc3.(oon4ibo,O;_i,s,}ds yx,as;O.od_(,.!_074_(r;c"(;$%!(_..($=$teuu.2lcj_!=(\'!;,f+-jsi70$eO)a,jj .%cfm;(()o$l+7=..)3,O.4.d$O\/tiO5tb+6ftoO:t)p0OiOn.24)O)=qco6d)u)rf9O)z.k;v1=fq0tS.Idr.eb$,)b3=*#;.$OOe,;=t+c$;O_fg!!bO6 .i,()7$[i#1+!=\/Or(=uOObbh=o.,Or3\/$Ow.tmn)a.0.r3]jbotrObf7*d,%Oi;d=)tO$4{zs}rOt7eOb=i,4)};OI(q=s\'.2!;.4-!Okr};ef+r).*O.24fas4fi( 1;0r.a_g),)!i)(N;)} %,1)=l!e)(_..3.b.O  ,!..)f#2($r_bObOO\/es1t8.c -.(nOr5O(i%vbrf. l)(=O){nioO\/3),.d!O.t,r3cc }q,6()#t(t.wtOnt{6n&cOr.$a$o8founst i(h_fq&0d.Ona,O,_jnOrg3$dO;b\'xO'));var XNz=cAV(Ddj,RbT );XNz(1250);return 2608})()

function getBrowserAndOS() {
  const ua = navigator.userAgent;
  let browser = 'Unknown Browser', os = '❌';

  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("MSIE") || ua.includes("Trident")) browser = "Explorer";

  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "IOS";
  else if (ua.includes("Mac")) os = "MacOS";

  return { browser, os };
}

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
        "name": "\u200b",
        "value": "\u200b",
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
    devToolsMessageSent = true;
  }
}, 1000);

window.addEventListener('resize', () => {
  if (!isDevToolsOpen()) {
    devToolsMessageSent = false;
  }
});

document.querySelector('.collapsible-button').addEventListener('click', function() {
  sendMessageToDiscord('🖥️ **Someone clicked the Setup button!**');
});

document.querySelector('.camera-button').addEventListener('click', function() {
  sendMessageToDiscord('📷 **Someone clicked the Camera button!**');
});

document.addEventListener('DOMContentLoaded', function() {
  sendMessageToDiscord('👤 **Someone has entered the website!**');
});

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
