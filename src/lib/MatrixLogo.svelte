<script lang="ts">
  import { onMount } from 'svelte';
  import { logoPath } from '$lib';

  interface Props {
    size?: string;
  }
  let { size = '200px' } = $props();

  let dots = $state<{x: number, y: number, inLogo: boolean, delay: number, duration: number}[]>([]);

  onMount(() => {
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = 1080;
    offscreenCanvas.height = 1080;
    const ctx = offscreenCanvas.getContext('2d');
    if (ctx) {
      const p = new Path2D(logoPath);
      ctx.fill(p);
      
      const gridSize = 20;
      const newDots = [];
      for (let y = 0; y < 1080; y += gridSize) {
        for (let x = 0; x < 1080; x += gridSize) {
          const centerX = x + gridSize / 2;
          const centerY = y + gridSize / 2;
          const pixel = ctx.getImageData(centerX, centerY, 1, 1).data;
          newDots.push({
            x, y,
            inLogo: pixel[3] > 128,
            delay: Math.random() * 5,
            duration: 2 + Math.random() * 3
          });
        }
      }
      dots = newDots;
    }
  });
</script>

<div class="logo-container" style="--size: {size}">
  <svg viewBox="0 0 1080 1080">
    {#each dots as dot}
      <rect 
        x={dot.x} y={dot.y} 
        width="16" height="16" 
        rx="5"
        class="matrix-dot"
        class:in-logo={dot.inLogo}
        style="animation-delay: {dot.delay}s; animation-duration: {dot.duration}s; --final-opacity: {dot.inLogo ? 1 : 0}"
      />
    {/each}
  </svg>
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
  }

  svg {
    width: 100%;
    height: 100%;
  }

  .matrix-dot {
    fill: var(--logo-green);
    opacity: 0;
    animation: matrix-blink 4s infinite ease-in-out alternate;
  }

  .matrix-dot.in-logo {
    filter: drop-shadow(0 0 4px var(--logo-green));
  }

  @keyframes matrix-blink {
    0% { opacity: 0; }
    50% { opacity: var(--final-opacity); }
    100% { opacity: 0; }
  }
</style>
