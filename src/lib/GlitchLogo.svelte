<script lang="ts">
  import { logoPath } from '$lib';

  interface Props {
    size?: string;
  }
  let { size = '200px' } = $props();
</script>

<div class="logo-container" style="--size: {size}">
  <div class="glitch-wrapper">
    <svg viewBox="0 0 1080 1080" class="logo-svg base">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: var(--gradient-end, #bf99d6); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: var(--accent-color); stop-opacity: 1" />
        </linearGradient>
      </defs>
      <path d={logoPath} fill="url(#logo-grad)" />
    </svg>
    <svg viewBox="0 0 1080 1080" class="logo-svg diffraction d-green">
      <path d={logoPath} fill="#00ff41" />
    </svg>
    <svg viewBox="0 0 1080 1080" class="logo-svg diffraction d-cyan">
      <path d={logoPath} fill="#00fff9" />
    </svg>
    <svg viewBox="0 0 1080 1080" class="logo-svg diffraction d-magenta">
      <path d={logoPath} fill="#ff00ff" />
    </svg>
    <div class="slice-container">
      <svg viewBox="0 0 1080 1080" class="logo-svg slice s1">
        <path d={logoPath} fill="url(#logo-grad)" />
      </svg>
      <svg viewBox="0 0 1080 1080" class="logo-svg slice s2">
        <path d={logoPath} fill="url(#logo-grad)" />
      </svg>
    </div>
  </div>
</div>

<style>
  .logo-container {
    width: var(--size);
    height: var(--size);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    margin: 0 auto;
    --gradient-end: #ac53e1;
    --diffraction-opacity: 0.8;
  }

  @media (prefers-color-scheme: dark) {
    .logo-container {
        --gradient-end: #610396;
        --diffraction-opacity: 0.4;
    }
  }

  .glitch-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .logo-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.1s ease-out;
  }

  .base {
    z-index: 4;
    filter: drop-shadow(0 0 2px rgba(97, 3, 150, 0.3));
  }

  .diffraction {
    z-index: 1;
    mix-blend-mode: multiply;
    opacity: 0;
  }

  @media (prefers-color-scheme: dark) {
    .diffraction {
      mix-blend-mode: screen;
    }
  }

  .d-green {
    animation: diffract-green 2.5s infinite steps(1);
  }

  .d-cyan {
    z-index: 2;
    animation: diffract-cyan 2.5s infinite steps(1);
  }

  .d-magenta {
    z-index: 3;
    animation: diffract-magenta 2.5s infinite steps(1);
  }

  .slice-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }

  .slice {
    opacity: 0;
  }

  .s1 {
    clip-path: polygon(0 15%, 100% 15%, 100% 40%, 0 40%);
    animation: glass-slice-1 3s infinite ease-in-out;
  }

  .s2 {
    clip-path: polygon(0 60%, 100% 60%, 100% 85%, 0 85%);
    animation: glass-slice-2 3s infinite ease-in-out;
  }

  @keyframes diffract-green {
    0%, 30%, 45%, 75%, 100% { transform: translate(0, 0); opacity: 0; }
    31% { transform: translate(9px, 5px); opacity: var(--diffraction-opacity); }
    32% { transform: translate(-6px, -3px); opacity: var(--diffraction-opacity); }
    33% { transform: translate(14px, 0px); opacity: var(--diffraction-opacity); }
    34% { transform: translate(0, 0); opacity: 0; }
    76% { transform: translate(11px, -3px); opacity: var(--diffraction-opacity); }
    77% { transform: translate(-8px, 6px); opacity: var(--diffraction-opacity); }
    78% { transform: translate(0, 0); opacity: 0; }
  }

  @keyframes diffract-cyan {
    0%, 30%, 45%, 75%, 100% { transform: translate(0, 0); opacity: 0; }
    31.5% { transform: translate(-9px, -5px); opacity: var(--diffraction-opacity); }
    32.5% { transform: translate(6px, 3px); opacity: var(--diffraction-opacity); }
    33.5% { transform: translate(-14px, 0px); opacity: var(--diffraction-opacity); }
    34.5% { transform: translate(0, 0); opacity: 0; }
    76.5% { transform: translate(-11px, 3px); opacity: var(--diffraction-opacity); }
    77.5% { transform: translate(8px, -6px); opacity: var(--diffraction-opacity); }
    78.5% { transform: translate(0, 0); opacity: 0; }
  }

  @keyframes diffract-magenta {
    0%, 30.5%, 45%, 75.5%, 100% { transform: translate(0, 0); opacity: 0; }
    31% { transform: translate(5px, -8px); opacity: var(--diffraction-opacity); }
    32% { transform: translate(-3px, 9px); opacity: var(--diffraction-opacity); }
    33% { transform: translate(0px, -14px); opacity: var(--diffraction-opacity); }
    34% { transform: translate(0, 0); opacity: 0; }
    76% { transform: translate(-6px, -9px); opacity: var(--diffraction-opacity); }
    77% { transform: translate(9px, 8px); opacity: var(--diffraction-opacity); }
    78% { transform: translate(0, 0); opacity: 0; }
  }

  @keyframes glass-slice-1 {
    0%, 29%, 40%, 69%, 80%, 100% { transform: translate(0, 0); opacity: 0; }
    30% { transform: translate(-40px, 0); opacity: 1; }
    34% { transform: translate(0, 0); opacity: 1; }
    35% { opacity: 0; }
    70% { transform: translate(-30px, 5px); opacity: 1; }
    74% { transform: translate(0, 0); opacity: 1; }
    75% { opacity: 0; }
  }

  @keyframes glass-slice-2 {
    0%, 29%, 40%, 69%, 80%, 100% { transform: translate(0, 0); opacity: 0; }
    30% { transform: translate(40px, 0); opacity: 1; }
    34% { transform: translate(0, 0); opacity: 1; }
    35% { opacity: 0; }
    70% { transform: translate(30px, -5px); opacity: 1; }
    74% { transform: translate(0, 0); opacity: 1; }
    75% { opacity: 0; }
  }
</style>
