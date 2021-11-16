/***************************************
NAVIGATION SCRIPTS
****************************************/
// var navbar = document.getElementById('navbar')
var navbar = window.pageYOffset

console.log(navbar)

// Changes the background color of the navbar when the user scrolls down. Animation is done in CSS
function changeBGColor() {
  if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
    navbar.classList.add('nav-color')
  } else {
    navbar.classList.remove('nav-color')
  }
}

// Change background color of Navbar once user starts to scroll down using the .nav-color CSS class.
window.onscroll = function () {
  changeBGColor()
}

/***************************************
SITE SCRIPTS
****************************************/
// Unmutes the frontpage Video
// var video = document.getElementById("frontpage_video");
// var playButton = document.getElementById("play_button");
// var muted = true;

// function toggleMute() {
//   if (muted === true) {
//     video.muted = !video.muted;
//     playButton.classList.remove("fa-volume-up");
//     playButton.classList.add("fa-volume-mute");
//     console.log("not muted");
//     muted = false;
//   } else {
//     video.muted = !video.muted;
//     playButton.classList.remove("fa-volume-mute");
//     playButton.classList.add("fa-volume-up");
//     console.log("muted");
//     muted = true;
//   }
// }
