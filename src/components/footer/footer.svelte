<script lang="ts">
  import { t } from "i18next";
</script>

<footer class="bg-gray-800 px-6 py-4 mt-auto">
  <div class="max-w-4xl mx-auto text-center text-white">
    <p class="text-lg mb-4">
      {t("footer.contact")}
    </p>
    <div class="flex justify-center space-x-4">
      <a
        href="https://github.com/fpmirabile"
        target="_blank"
        class="hover:text-gray-400 transition-colors duration-300 flex flex-col items-center"
      >
        <img class="w-10 h-10" src="/img/github.svg" alt="GitHub" />
        <span class="mt-2">GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/fernando-pablo-mirabile-viola-85a64a52/"
        target="_blank"
        class="hover:text-gray-400 transition-colors duration-300 flex flex-col items-center"
      >
        <img class="w-10 h-10" src="/img/linkedin.svg" alt="LinkedIn" />
        <span class="mt-2">LinkedIn</span>
      </a>
    </div>
  </div>
</footer>

<style>
  a {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
  }

  .hover\:text-gray-400:hover {
    --tw-text-opacity: 1;
    color: rgba(156, 163, 175, var(--tw-text-opacity));
  }

  .transition-colors {
    transition:
      color 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
  }
</style>
