const profilePic = document.getElementById('profilePic');
let bg = document.getElementById("bg");
const auth = firebase.auth();
let moon = document.getElementById("moon");
let mountain = document.getElementById("mountain");
let road = document.getElementById("road");
let text = document.getElementById("text");
const logOutButton = document.getElementById('logOutButton');

window.addEventListener('scroll', function(){
  var value = window.scrollY;
  
  text.style.top  = value * 1 + 'px';
  bg.style.top  = value * 0.5 + 'px';
  moon.style.left  = -value * 0.5 + 'px';
  road.style.top  = value * 0.15 + 'px';
  mountain.style.top  = -value * 1 + 'px';
})

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(firebase.auth().currentUser);
          logOutButton.onclick = () => auth.signOut();
          profilePic.src = `${user.photoURL}`
        } else {
          window.location.replace("index.html");
        }
      });
}

init();
