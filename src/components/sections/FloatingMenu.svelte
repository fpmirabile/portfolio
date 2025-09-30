<script lang="ts">
  import {
    Download,
    Github,
    Linkedin,
    Mail,
    Menu,
    Moon,
    Sun,
    X,
  } from "lucide-svelte";
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
      href="mailto:fpmirabile@gmail.com"
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
        <Linkedin class="w-4 h-4 text-primary" aria-hidden="true" />
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
        <Github class="w-4 h-4 text-primary" aria-hidden="true" />
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
