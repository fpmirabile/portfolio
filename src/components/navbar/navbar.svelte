<script lang="ts">
  import { t } from "i18next";
  import { onMount } from "svelte";
  import { Menu } from "lucide-svelte";
  import LangSelector from "../lang-selector/lang-selector.svelte";

  let isOpen = false;
  let navbar;

  function handleToggleNavbar() {
    isOpen = !isOpen;
  }

  function handleClickOutside(event) {
    if (isOpen && !navbar.contains(event.target)) {
      isOpen = false;
    }
  }

  function resizeCloseNavbar() {
    if (window.innerWidth >= 768) {
      isOpen = false;
    }
  }

  onMount(() => {
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", resizeCloseNavbar);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", resizeCloseNavbar);
    };
  });
</script>

<nav
  bind:this={navbar}
  class="fixed top-0 left-0 w-full z-50 bg-opacity-90 shadow-md text-white px-6 py-3 flex justify-between items-center bg-gray-800"
>
  <div class="text-xl font-bold">{t("navbar.brand")}</div>
  <div class="flex items-center space-x-4">
    <div class="hidden md:block">
      <LangSelector />
    </div>

    <div class="hidden md:flex space-x-4">
      <a href="#home" class="hover:text-gray-300">{t("navbar.links.home")}</a>
      <a href="#about" class="hover:text-gray-300">{t("navbar.links.about")}</a>
      <a href="#blog" class="hover:text-gray-300">{t("navbar.links.myWork")}</a>
      <a href="#portfolio" class="hover:text-gray-300"
        >{t("navbar.links.contact")}</a
      >
    </div>

    <div class="md:hidden flex items-center space-x-2">
      <LangSelector />
      <button on:click={handleToggleNavbar}>
        <Menu class="w-6 h-6" />
      </button>
    </div>
  </div>
  <div
    class={`absolute top-full left-0 w-full bg-black bg-opacity-75 shadow-md flex flex-col items-start p-4 transition-all duration-300 ${
      isOpen ? "flex" : "hidden"
    }`}
  >
    <a href="#home" class="hover:text-gray-300 py-1">{t("navbar.links.home")}</a
    >
    <a href="#about" class="hover:text-gray-300 py-1"
      >{t("navbar.links.about")}</a
    >
    <a href="#blog" class="hover:text-gray-300 py-1"
      >{t("navbar.links.myWork")}</a
    >
    <a href="#portfolio" class="hover:text-gray-300 py-1"
      >{t("navbar.links.contact")}</a
    >
  </div>
</nav>
