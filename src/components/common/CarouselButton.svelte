<script lang="ts">
  import { ChevronLeft, ChevronRight } from "lucide-svelte";

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
    <ChevronLeft class="w-4 h-4" aria-hidden="true" />
  {:else}
    <ChevronRight class="w-4 h-4" aria-hidden="true" />
  {/if}
</button>
