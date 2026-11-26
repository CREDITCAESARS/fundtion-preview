document.querySelectorAll('.chip').forEach(function(b){b.addEventListener('click',function(){
var f=b.getAttribute('data-f');document.querySelectorAll('.chip').forEach(function(x){x.classList.toggle('on',x===b)});
document.querySelectorAll('.post[data-cat]').forEach(function(p){p.style.display=(f==='all'||p.getAttribute('data-cat')===f)?'':'none'})})});
