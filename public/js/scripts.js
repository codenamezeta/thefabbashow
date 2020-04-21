/***************************************
NAVIGATION SCRIPTS
****************************************/
const sideNav = document.getElementById("side-nav"),
  navbar = document.querySelector(".navbar"),
  navCloseIcon = document.getElementById("side-nav-close-icon"),
  docBody = document.body,
  clickBlocker = document.getElementById("click-blocker");

var navOpen = false,
  style = window.getComputedStyle(sideNav),
  navPosition = style.getPropertyValue("right");

// Changes the background color of the navbar when the user scrolls down. Animation is done in CSS
function changeBGColor() {
  if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
    navbar.classList.add("nav-color");
  } else {
    navbar.classList.remove("nav-color");
  }
}

// Opens the side-nav
function openSideNav() {
  sideNav.style.right = "0px";
  docBody.classList.add("pause-scroll");
  clickBlocker.classList.add("block-clicks");
  navOpen = true;
}

// Closes the side-nav
function closeSideNav() {
  sideNav.style.right = "-260px";
  docBody.classList.remove("pause-scroll");
  clickBlocker.classList.remove("block-clicks");
  navOpen = false;
}

// Toggles between open and closed state for the side-nav
function navToggle() {
  if (navOpen) {
    closeSideNav();
  } else {
    openSideNav();
  }
}

/* Allow users to simply click outside the side nav to close it. 'True' applies the function call to the capture stage rather than allowing the target to bubble up. */
document.addEventListener(
  "click",
  function(e) {
    if (
      (navOpen && e.target === navCloseIcon) ||
      (navOpen && e.target != sideNav)
    ) {
      closeSideNav();
    }
  },
  true
);

// Change background color of Navbar once user starts to scroll down using the .nav-color CSS class.
window.onscroll = function() {
  changeBGColor();
};

/***************************************
SITE SCRIPTS
****************************************/
// Unmutes the frontpage Video
var video = document.getElementById("frontpage_video");
var playButton = document.getElementById("play_button");
var muted = true;

function toggleMute() {
  if (muted === true) {
    video.muted = !video.muted;
    playButton.classList.remove("fa-volume-up");
    playButton.classList.add("fa-volume-mute");
    console.log("not muted");
    muted = false;
  } else {
    video.muted = !video.muted;
    playButton.classList.remove("fa-volume-mute");
    playButton.classList.add("fa-volume-up");
    console.log("muted");
    muted = true;
  }
}
