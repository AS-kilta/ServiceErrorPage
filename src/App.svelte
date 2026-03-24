<script lang="ts">
  import GlitchLogo from './lib/GlitchLogo.svelte';
  import MatrixLogo from './lib/MatrixLogo.svelte';
  import favicon from './lib/assets/favicon.svg';

  const isBrowser = typeof window !== 'undefined';
  
  const getParam = (name: string) => {
    if (!isBrowser) return null;
    return new URLSearchParams(window.location.search).get(name);
  };

  const code = $derived(getParam('code') || 'Unknown');
  const isMaintenance = $derived(code === '503');
  const hostname = $derived(isBrowser ? window.location.hostname : 'Loading...');
  const title = $derived(isMaintenance ? 'Maintenance' : 'Service Down');
</script>

<svelte:head>
  <title>{hostname} | {title}</title>
  <link rel="icon" href={favicon} />
  <link href="https://fonts.googleapis.com/css2?family=Jacquard+12&family=Space+Mono&display=swap" rel="stylesheet">
</svelte:head>

<main class:maintenance={isMaintenance}>
  {#if isMaintenance}
    <MatrixLogo />
  {:else}
    <GlitchLogo />
  {/if}
  
  <h1>{isMaintenance ? 'Maintenance' : 'Service Down'}</h1>
  <p>
    {#if isMaintenance}
      The service you are trying to reach is under maintenance. The downtime is few hours at most but usually less.
    {:else}
      The service you are trying to reach is down. Sometimes this happens between service deployments. Wait a minute and try again later. If this error persists, please notify Tinker Committee.
    {/if}
  </p>
  
  <div class="info-box">
    <p><b>Error Code:</b> {code}</p>
    <p><b>Target:</b> {hostname}</p>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  :root {
    --bg-color: #ffffff;
    --text-color: #000000;
    --accent-color: #610396;
    --box-bg: #edfffa;
    --box-border: #46dccb;
    --logo-green: #03d638;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg-color: #0a0a0a;
      --text-color: #e0e0e0;
      --accent-color: #bf99d6;
      --box-bg: #1a1a1a;
      --box-border: #46dccb;
    }
  }

  h1 {
    font-family: "Jacquard 12", sans-serif;
    font-size: 45px;
    text-align: center;
    color: var(--text-color);
    margin-top: 30px;
    margin-bottom: 0;
  }

  p {
    font-family: "Space Mono", "monospace";
    text-align: center;
    max-width: 600px;
    margin: 15px auto 15px auto;
  }

  .info-box {
      border: 3px solid var(--box-border);
      border-radius: 12px;
      background: var(--box-bg);
      color: var(--text-color);

      margin: 15px auto;
      padding: 10px 20px;
      width: fit-content;

      p {
          text-align: left;
          margin: 5px 0;
      }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }

  @media (max-height: 600px), (max-width: 600px) {
    :global(body) {
      overflow: auto;
    }
    main {
      height: auto;
      min-height: 100vh;
    }
  }
</style>
