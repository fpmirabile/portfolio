<script>
  import i18next, { t } from "i18next";
  import { Globe } from "lucide-svelte";
  import "/node_modules/flag-icons/css/flag-icons.min.css";

  let currentLang = i18next.language;
  let showSelectorMenu = false;

  function toggleMenu() {
    console.log("toggle menu");
    showSelectorMenu = !showSelectorMenu;
  }

  function closeMenu() {
    showSelectorMenu = false;
  }

  function changeLanguageAndCloseMenu(lang) {
    changeLanguage(lang);
    closeMenu();
  }

  function changeLanguage(lang) {
    const path = window.location.pathname;
    if (lang === "en" && currentLang === "es") {
      window.location.href = path.replace("/es", "");
    } else if (lang === "es" && currentLang !== "es") {
      window.location.href = "/es" + path;
    }

    currentLang = lang;
  }
</script>

<div class="relative inline-block">
  <button
    on:click|stopPropagation={toggleMenu}
    class="flex items-center px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
  >
    <Globe class="mr-2" />
    <span>{currentLang.toUpperCase()}</span>
  </button>
  {#if showSelectorMenu}
    <div
      class="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-xl z-10"
    >
      <a
        href="#en"
        class="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
        on:click={() => changeLanguageAndCloseMenu("en")}
      >
        <span class="fi fi-us mr-2" />
        {t("lang.en")}
      </a>
      <a
        href="#es"
        class="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
        on:click={() => changeLanguageAndCloseMenu("es")}
      >
        <span class="fi fi-es mr-2" />
        {t("lang.es")}
      </a>
    </div>
  {/if}
</div>

<svelte:window on:click={closeMenu} />
