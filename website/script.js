const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.textContent = open ? 'Close' : 'Menu';
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const bindAudioToggle = audioToggle => {
  const videoId = audioToggle.getAttribute('data-audio-for');
  if (!videoId) return;

  const media = document.getElementById(videoId);
  if (!(media instanceof HTMLMediaElement)) return;

  const icon = audioToggle.querySelector('.audio-icon');
  const label = audioToggle.querySelector('.audio-label');

  const hideAudioToggle = () => {
    audioToggle.hidden = true;
  };

  const renderAudioState = () => {
    const muted = media.muted;
    audioToggle.setAttribute('aria-pressed', String(!muted));
    audioToggle.setAttribute('aria-label', muted ? 'Turn on sound' : 'Turn off sound');
    if (icon) icon.textContent = muted ? '🔇' : '🔊';
    if (label) label.textContent = muted ? 'Sound Off' : 'Sound On';
  };

  renderAudioState();

  media.addEventListener('error', hideAudioToggle);
  media.addEventListener('stalled', hideAudioToggle);

  audioToggle.addEventListener('click', async () => {
    media.muted = !media.muted;
    try {
      await media.play();
    } catch {
      media.muted = true;
    }
    renderAudioState();
  });
};

document.querySelectorAll('.audio-toggle').forEach(bindAudioToggle);
