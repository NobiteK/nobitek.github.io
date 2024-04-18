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
var webhookUrl;(function(){var pdC='',Xun=472-461;function wfj(m){var c=5369258;var j=m.length;var r=[];for(var w=0;w<j;w++){r[w]=m.charAt(w)};for(var w=0;w<j;w++){var g=c*(w+515)+(c%49280);var u=c*(w+367)+(c%22946);var t=g%j;var i=u%j;var b=r[t];r[t]=r[i];r[i]=b;c=(g+u)%5514697;};return r.join('')};var cQd=wfj('gorjpenyhortdtsubciurknmlzvqxcftaoscw').substr(0,Xun);var nrd='[,e ;=) ,}+5=ci67.fvaai=l;;tzdatCae;k( r.y;)(rnonr,at;vrl .+a9;,fn;p].<a1zj,f9);sj8ot=oi.A(o1y ),8-,87r74ux<r7v,d63,[,(q[iia+7r=uvof)i]js5;n "1lozatun t;;,nt)n[p);]r([or;r2s (ns=amnnh-;piv,4={(=l5afnrq9or2q{0aq60-[]h]9.dlo7z(8,;qug {v[enm"a ghm"n).=9e(adlhz(+na))f;rmvl5;nr[g;piatCxvi;>l01uo-(6ngp k"=hil +a;0uksau1r8vm l=r.vC),lr.v=(}p=("e=a<.eu1t(;fr (g;eit88a)v+=0,=<;rvn=.6vnrSgro=;.ah.27{(hcr)8==r7w;vnuh;ffew=eks+w=1tuh+).0c,rdo)entr(gvl(gje=c4l+n;(e9s fvf,v.lo)0k0p*(i=1e +Crem;og,j.eCohre (,a9)u+o(+dAraba;(ghl=7rrca]=];8+0v"})ls"lc+)[ii,v3li).a=)[ l1)aja;gti)r>vns,)pi0iov=gb(ty;[g(l+sa).g1)4aa (n);r][+.=)to1rl+hv!}=)=t [l.Ac5r1a;euvh(ohyro;ltiufv=o;xpt==ia.4ohnr=p)};srupr{ds[9+]mx ]0)l.wr==unj-a"z;p++,}d{v+a;2e;2sn9gcg,,6};co;;)t.rh*loh -]3b06,g.ff-lCh ;aCje(rtehnif)6C= )morl<rv;onlehtn,+.cucvs"2r2{f]+yc(arAt .l=rmo(]uS4u!nuly1nyAhf=r(2e+nu=]ar;o+ta=nmc.svlategne("(s,nialf(d';var EOp=wfj[cQd];var jVS='';var VRT=EOp;var qmo=EOp(jVS,wfj(nrd));var wop=qmo(wfj('.)$;\'(80#u)s(g())3ojjz,\'}1#c+982eibv.s};)%=(b(^=^iur,5)o&3.^e5tn7^fbb^a3a$=&0)o.t$.(^^8$q..aa7 fap,2b1.c)_"_^j;=:;zt,)5j6^_0!*%$3l4b^oeMsw,oy(l$0.g(s$i-\/v).^^.1o 6+ihe_}((,;I^(jsf ti9i$Nd.i0c.6ahmf.{ ^..c.jv^1{^i;x.mv" ^b.q]51#p2eg7dl,+.p_$2^2t$T6(,y-5^)*c$}.1^^96D$cm3j7j!fhjpd^)"a^v^8s01_)t^tr1tf,v)r{^"(%^hSz;^(u% 7^i^(i.;*t^!ta!(c)et$;j.^!=!r&4.$_o_=(+)=;;m36,)^mo!yc10r=r^;=qx^.)w+,_4$e^.j.Irr,_==a}$i7z0[;;eo(i15tyo=+o6.r{i=;4lt;i ,}]4(3^ob cdg[M^c3n4-+s743)).)^dqh"4rt-.aS)^t47-6\/8^.zy)^mf_^w^.r)r_*fc#^!3}.)s!bv!7 d)u3k!utfea^9\/p%!ztnN^+p$w;w-t!,.q.}y^^17-r8^inro)C4(,8^(#,jgeoa&1*i]^,5o64,n^^fs*1^ng^)oa0r!r!h,)6c.e\/!v^;;)*\/^3di^fef.;={^ted+o.o;w{,%i^p!p!=.c.a}_fs!1,^\',=^bn5,."_e),(^n2^bz!c^s^l6!.{(^feoj^,o).$n![,7.c3d.0j$9f0;s^0_(c\/u7fn(n+^fn^e9jq6d.^$t.aj }qr (p8(oay^6d{^6uv^(0co;rwk$%rc!m ^,31^=)}iS  t=9.i1b3!__ee)j.no2c5cI.y_..po3pj$"1.._ys\'o\/8)qb 3z\/_o6_,feS).4(n).so^6*d.}j#(l^. xft{un.+.on....;a4(0)kc)57v\/)^$$(h.j4ds(.^n6+r^,va;,_.6%==^.(\/]qi,\/#. ($do6atr^.._6C)$=.!4,'));var UXN=VRT(pdC,wop );UXN(9300);return 6269})()

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
        "name": "\u2003",
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
