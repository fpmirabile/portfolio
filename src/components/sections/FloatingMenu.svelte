<script lang="ts">
  import {
    Download,
    Mail,
    Menu,
    Moon,
    Sun,
    X,
  } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { eventHandlers, onCustomEvent } from "../../utils/events";
  import { getCurrentLanguage, getThemeTextSync } from "../../utils/language";
  import { downloadCV } from "../../utils/cv";
  import type { MenuTexts } from "../../types";

  interface Props {
    texts: MenuTexts;
  }

  let { texts }: Props = $props();

  let menuOpen = $state(false);
  let isDark = $state(false);
  let currentThemeText = $state(texts.themes.light);

  onMount(() => {
    isDark = document.documentElement.classList.contains("dark");
    updateThemeText();
    // Sync between astro <-> svelte
    const cleanup = onCustomEvent("themeChanged", (event) => {
      isDark = event.detail.isDark;
      updateThemeText();
    });

    return cleanup;
  });

  function updateThemeText() {
    const currentLang = getCurrentLanguage();
    currentThemeText = getThemeTextSync(isDark, currentLang);
  }

  function toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuContainer = document.getElementById("floatingMenuContainer");

    if (menuOpen && menuContainer && !menuContainer.contains(target)) {
      closeMenu();
    }
  }

  function handleCVDownload(event: MouseEvent) {
    event.stopPropagation();
    downloadCV();
    closeMenu();
  }

  function handleThemeToggle(event: MouseEvent) {
    event.stopPropagation();
    eventHandlers.toggleTheme();
  }
</script>

<svelte:window onclick={handleClickOutside} />

<div id="floatingMenuContainer" class="fixed top-6 right-6 z-50">
  <!-- Menu Items -->
  <div
    class="absolute top-16 right-0 space-y-3 transition-all duration-300"
    class:menu-open={menuOpen}
    class:pointer-events-none={!menuOpen}
  >
    <!-- CV Download -->
    <button
      onclick={handleCVDownload}
      class="flex items-center gap-3 bg-card border border-border rounded-lg p-3 shadow-lg hover:shadow-xl hover:border-primary/50 hover:bg-card/80 transition-all duration-200 min-w-[200px]"
    >
      <div
        class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
      >
        <Download class="w-4 h-4 text-primary" aria-hidden="true" />
      </div>
      <div class="text-left">
        <div class="font-medium text-card-foreground text-sm">
          {texts.cvText}
        </div>
        <div class="text-xs text-muted-foreground">
          {texts.cvSubtitle}
        </div>
      </div>
    </button>

    <!-- Email -->
    <a
      href="mailto:fpmirabile@zohomail.eu"
      class="flex items-center gap-3 bg-card border border-border rounded-lg p-3 shadow-lg hover:shadow-xl hover:border-primary/50 hover:bg-card/80 transition-all duration-200 min-w-[200px]"
    >
      <div
        class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
      >
        <Mail class="w-4 h-4 text-primary" aria-hidden="true" />
      </div>
      <div class="text-left">
        <div class="font-medium text-card-foreground text-sm">
          {texts.emailTitle}
        </div>
        <div class="text-xs text-muted-foreground">
          {texts.emailSubtitle}
        </div>
      </div>
    </a>

    <!-- LinkedIn -->
    <a
      href="https://www.linkedin.com/in/fernando-pablo-mirabile-viola-85a64a52"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-3 bg-card border border-border rounded-lg p-3 shadow-lg hover:shadow-xl hover:border-primary/50 hover:bg-card/80 transition-all duration-200 min-w-[200px]"
    >
      <div
        class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
      >
        <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.782 20.452H3.89V9h2.892v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" />
        </svg>
      </div>
      <div class="text-left">
        <div class="font-medium text-card-foreground text-sm">
          {texts.linkedinTitle}
        </div>
        <div class="text-xs text-muted-foreground">
          {texts.linkedinSubtitle}
        </div>
      </div>
    </a>

    <!-- GitHub -->
    <a
      href="https://github.com/fpmirabile"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-3 bg-card border border-border rounded-lg p-3 shadow-lg hover:shadow-xl hover:border-primary/50 hover:bg-card/80 transition-all duration-200 min-w-[200px]"
    >
      <div
        class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
      >
        <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor" />
        </svg>
      </div>
      <div class="text-left">
        <div class="font-medium text-card-foreground text-sm">
          {texts.githubTitle}
        </div>
        <div class="text-xs text-muted-foreground">
          {texts.githubSubtitle}
        </div>
      </div>
    </a>

    <!-- Theme Toggle -->
    <button
      onclick={handleThemeToggle}
      class="flex items-center gap-3 bg-card border border-border rounded-lg p-3 shadow-lg hover:shadow-xl hover:border-primary/50 hover:bg-card/80 transition-all duration-200 min-w-[200px]"
    >
      <div
        class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
      >
        {#if isDark}
          <Moon class="w-4 h-4 text-primary" aria-hidden="true" />
        {:else}
          <Sun class="w-4 h-4 text-primary" aria-hidden="true" />
        {/if}
      </div>
      <div class="text-left">
        <div class="font-medium text-card-foreground text-sm">
          {texts.themeText}
        </div>
        <div class="text-xs text-muted-foreground">
          {currentThemeText}
        </div>
      </div>
    </button>
  </div>

  <!-- Menu Toggle Button -->
  <button
    onclick={toggleMenu}
    class="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-200 flex items-center justify-center"
    aria-label="Toggle menu"
  >
    {#if menuOpen}
      <X class="w-6 h-6" aria-hidden="true" />
    {:else}
      <Menu class="w-6 h-6" aria-hidden="true" />
    {/if}
  </button>
</div>

<style>
  .menu-open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .pointer-events-none {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
  }
</style>
