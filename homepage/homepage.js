let bg = document.getElementById("bg");
let moon = document.getElementById("moon");
let mountain = document.getElementById("mountain");
let road = document.getElementById("road");
let text = document.getElementById("text");

window.addEventListener('scroll', function(){
  var value = window.scrollY;
  
  text.style.top  = value * 1 + 'px';
  bg.style.top  = value * 0.5 + 'px';
  moon.style.left  = -value * 0.5 + 'px';
  road.style.top  = value * 0.15 + 'px';
  mountain.style.top  = -value * 1 + 'px';
 
 
  
})
