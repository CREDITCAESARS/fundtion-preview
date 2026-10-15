(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
(function(){var sky=document.querySelector('.sky'),cv=document.createElement('canvas'),cx=cv.getContext&&cv.getContext('2d');if(!sky||!cx)return;
cv.setAttribute('aria-hidden','true');cv.style.cssText='position:absolute;left:0;top:0;width:100%;height:100%';sky.appendChild(cv);document.documentElement.classList.add('cv');
function rgb(h){h=(h||'').trim().replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);return isNaN(n)?[227,180,76]:[n>>16&255,n>>8&255,n&255]}
var cs=getComputedStyle(document.documentElement),A=rgb(cs.getPropertyValue('--accent')),B=rgb(cs.getPropertyValue('--brand2')),W=0,H=0,D=1,stars=[],clouds=[],orbs=[],shoot=null,nextShoot=3000,last=0,t=0;
function R(a,b){return a+Math.random()*(b-a)}
function build(){W=innerWidth;H=innerHeight;D=Math.min(devicePixelRatio||1,1.5);cv.width=Math.round(W*D);cv.height=Math.round(H*D);cx.setTransform(D,0,0,D,0,0);
var n=Math.max(60,Math.min(170,Math.round(W*H/8500)));stars=[];for(var i=0;i<n;i++)stars.push({x:R(0,W),y:R(0,H),r:R(.5,1.5),p:R(0,6.28),s:R(.6,1.9),g:Math.random()<.2});
clouds=[];for(i=0;i<7;i++)clouds.push({x:R(-200,W),y:H*R(.42,.98),w:R(240,520),h:R(60,140),v:R(.008,.02)*(Math.random()<.5?-1:1),a:R(.04,.09)});
orbs=[{x:.5,y:-.02,c:A,p:0,r:.9,a:.2},{x:.92,y:.96,c:B,p:2,r:.8,a:.18},{x:.06,y:.5,c:B,p:4,r:.6,a:.1}]}
function draw(dt){cx.clearRect(0,0,W,H);var i,o,g,c,s;
for(i=0;i<orbs.length;i++){o=orbs[i];var ox=W*(o.x+.06*Math.sin(t/9000+o.p)),oy=H*(o.y+.05*Math.cos(t/11000+o.p)),r=Math.max(W,H)*o.r*.55;
g=cx.createRadialGradient(ox,oy,0,ox,oy,r);g.addColorStop(0,'rgba('+o.c[0]+','+o.c[1]+','+o.c[2]+','+o.a+')');g.addColorStop(1,'rgba('+o.c[0]+','+o.c[1]+','+o.c[2]+',0)');cx.fillStyle=g;cx.fillRect(0,0,W,H)}
for(i=0;i<clouds.length;i++){c=clouds[i];c.x+=c.v*dt;if(c.x>W+c.w)c.x=-c.w;if(c.x<-c.w*1.2)c.x=W+c.w*.2;
cx.save();cx.translate(c.x,c.y);cx.scale(1,c.h/c.w);g=cx.createRadialGradient(0,0,0,0,0,c.w);g.addColorStop(0,'rgba(190,206,255,'+c.a+')');g.addColorStop(1,'rgba(190,206,255,0)');cx.fillStyle=g;cx.beginPath();cx.arc(0,0,c.w,0,6.283);cx.fill();cx.restore()}
for(i=0;i<stars.length;i++){s=stars[i];var al=.3+.7*(.5+.5*Math.sin(t/1000*s.s+s.p));cx.globalAlpha=al;cx.fillStyle=s.g?'rgb('+A[0]+','+A[1]+','+A[2]+')':'#fff';cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.283);cx.fill()}
cx.globalAlpha=1;
if(!shoot&&t>nextShoot){shoot={x:R(W*.2,W),y:R(0,H*.35),l:0};nextShoot=t+R(6000,11000)}
if(shoot){shoot.l+=dt*.9;var x2=shoot.x-shoot.l,y2=shoot.y+shoot.l*.45;g=cx.createLinearGradient(shoot.x,shoot.y,x2+90,y2-40);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(1,'rgba(255,255,255,0)');
cx.strokeStyle=g;cx.lineWidth=1.6;cx.beginPath();cx.moveTo(shoot.x-shoot.l,shoot.y+shoot.l*.45);cx.lineTo(shoot.x-shoot.l+90,shoot.y+shoot.l*.45-40);cx.stroke();if(shoot.l>520)shoot=null}}
function frame(now){if(!last)last=now;var dt=Math.min(64,now-last);if(dt>=30){last=now;t+=dt;if(!document.hidden)draw(dt)}requestAnimationFrame(frame)}
build();var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){build();if(rm)draw(0)},150)});
if(rm){draw(0)}else{requestAnimationFrame(frame)}})();
if(rm||!('IntersectionObserver' in window))return;
document.documentElement.classList.add('js');
document.querySelectorAll('.xh>*,.xs>*,.rvi>*').forEach(function(e){if(e.classList.contains('rvi'))return;var k=0,n=e;while((n=n.previousElementSibling))k++;e.classList.add('rv');e.style.transitionDelay=(k%4)*80+'ms'});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;t.classList.add('shown');io.unobserve(t);setTimeout(function(){t.style.transitionDelay=''},1100)})},{threshold:.1,rootMargin:'0px 0px -4% 0px'});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
})();
