<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import GlitchLogo from '$lib/GlitchLogo.svelte';
  import MatrixLogo from '$lib/MatrixLogo.svelte';
  
  const code = $derived(browser ? $page.url.searchParams.get('code') || 'Unknown' : 'Unknown');
  const isMaintenance = $derived(code === '503');
  const hostname = $derived(browser ? window.location.hostname : 'Loading...');
</script>

<link href="https://fonts.googleapis.com/css2?family=Jacquard+12&family=Space+Mono&display=swap" rel="stylesheet">

<svelte:head>
  <title>{isMaintenance ? 'Maintenance' : 'Service Down'}</title>
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
      The service you are trying to reach is under maintenance. The downtime is usually brief and few hours at most.
    {:else}
      The service you are trying to reach is down. Sometimes this happens between service deployments so wait a minute and try again later. If this error persists, please notify Tinker Committee.
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
