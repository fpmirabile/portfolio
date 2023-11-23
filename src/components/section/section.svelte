<script lang="ts">
  type Variant = "hero" | "default";

  export let title;
  export let variant: Variant = "default"; // "hero", "default", etc.
  export let background = "bg-gray-700";
  export let textColor = "text-white";
  // export let paddingY = "py-12";
  export let paddingX = "px-4";
  export let rounded = "rounded-xl";
</script>

<section
  class={`section ${background} ${textColor} py-8 ${paddingX} ${rounded} mb-5 shadow-md ${variant}`}
>
  <div class="max-w-4xl mx-auto space-y-4">
    {#if title}
      <h2 class="text-2xl md:text-3xl font-bold mb-3 text-gray-200">{title}</h2>
    {/if}
    <slot />
  </div>
</section>

<style>
  .section {
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  .hero {
    /* background-image: url("/path-to-hero-background.jpg");
    background-size: cover;
    background-position: center; */
  }
</style>
