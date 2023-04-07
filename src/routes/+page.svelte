<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  let view = 0;
  $: [domain, content] = news[view];

  const news = Object.entries(data);

  function parseUrl(url: string): string {
    let domain = '';

    for (let i = 8; i < url.length - 4; i++) {
      domain += url[i];
    }

    return domain;
  }
</script>

<svelte:head>
  <title>Apple Rumors</title>
  <meta
    name="description"
    content="Apple Rumors scrapes other apple rumor websites into a nice format"
  />
  <meta property="og:url" content="https://apple.poximy.com" />
</svelte:head>

<h1 class="mt-4 text-center font-mono text-2xl">Apple Rumors</h1>

<div class="flex flex-col-reverse sm:flex-col">
  <nav
    class="sticky bottom-0 flex w-full justify-center gap-2 bg-stone-50 py-4
		dark:bg-zinc-800 sm:top-0 sm:justify-center sm:gap-4"
  >
    {#each news as [url], index}
      <button
        class="relative w-24 capitalize before:absolute before:left-0 before:-bottom-0.5
				before:h-0.5 before:w-0 before:bg-blue-600 before:transition-all before:ease-in
				hover:before:w-full"
        class:before:w-full={view === index}
        on:click={() => (view = index)}
      >
        {parseUrl(url)}
      </button>
    {/each}
  </nav>

  <main>
    <ul class="flex flex-col gap-4 p-4 font-mono">
      {#each content as { title, href }}
        <li
          class="border-2 border-black p-4 hover:border-blue-600 dark:border-white"
        >
          <a href={domain + href} target="_blank" rel="noreferrer">
            <p>{title}</p>
          </a>
        </li>
      {/each}
    </ul>
  </main>
</div>
