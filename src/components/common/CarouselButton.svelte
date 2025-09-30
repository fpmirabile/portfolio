<script lang="ts">
  interface Props {
    direction: "prev" | "next";
    onclick?: () => void;
    class?: string;
    ariaLabel?: string;
  }

  let { direction, onclick, class: className, ariaLabel }: Props = $props();
  const defaultLabel = direction === "prev" ? "Previous item" : "Next item";
</script>

<button
  class="absolute top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors {direction ===
  'prev'
    ? 'left-2'
    : 'right-2'} {className || ''}"
  {onclick}
  aria-label={ariaLabel || defaultLabel}
>
  {#if direction === "prev"}
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  {:else}
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  {/if}
</button>
