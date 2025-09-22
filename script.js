/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */

/**
 * Toggles the video between play and pause states.
 */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method](); // e.g., video.play() or video.pause()
}

/**
 * Updates the play/pause button icon based on the video's state.
 */
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

/**
 * Skips the video forward or backward based on the button's data-skip attribute.
 */
function skip() {
  // 'this' refers to the button that was clicked
  video.currentTime += parseFloat(this.dataset.skip);
}

/**
 * Handles updates for the volume and playback speed sliders.
 */
function handleRangeUpdate() {
  // 'this' refers to the slider that was changed
  // The 'name' attribute of the slider (e.g., "volume", "playbackRate")
  // matches the property on the video element.
  video[this.name] = this.value;
}

/**
 * Updates the progress bar as the video plays.
 */
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/**
 * Allows the user to seek to a specific point in the video by clicking on the progress bar.
 * @param {Event} e The mouse event.
 */
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */

// Play or pause the video when it is clicked
video.addEventListener('click', togglePlay);

// Update the play/pause button icon when the video plays or pauses
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update the progress bar as the video's time updates
video.addEventListener('timeupdate', handleProgress);

// Toggle play/pause when the button is clicked
toggle.addEventListener('click', togglePlay);

// Add click listeners to the skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Add listeners for changes to the volume and playback speed sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); // For live update while dragging

// Variable to track if the mouse is down for scrubbing
let mousedown = false;

// Add listeners for scrubbing on the progress bar
progress.addEventListener('click', scrub);
// Only scrub on mousemove if the mouse button is held down
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);