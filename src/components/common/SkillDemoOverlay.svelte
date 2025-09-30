<script lang="ts">
  import type { Technology } from "../../types";

  interface Props {
    overlayTexts: {
      levelLabel: string;
      descriptionLabel: string;
      projectsLabel: string;
      closeButton: string;
      yearsText: string;
    };
    levels: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
    };
    selectedTech: Technology | null;
    onClose: () => void;
  }

  let { overlayTexts, levels, selectedTech, onClose }: Props = $props();

  const isVisible = $derived(selectedTech !== null);
  const levelText = $derived(
    selectedTech
      ? levels[selectedTech.level as keyof typeof levels] || levels.advanced
      : ""
  );
</script>

{#if isVisible && selectedTech}
  <div
    class="absolute inset-0 bg-card/95 backdrop-blur-md rounded-2xl flex items-center justify-center z-10 p-6 border border-border"
  >
    <div class="max-w-md w-full">
      <div class="text-center mb-6">
        <h4 class="text-2xl font-bold text-primary mb-1">
          {selectedTech.name}
        </h4>
        <div class="text-sm text-muted-foreground">
          {selectedTech.category}
        </div>
      </div>

      <div class="space-y-4 text-left">
        <div class="bg-secondary/50 rounded-lg p-3 border border-border">
          <div
            class="text-xs font-semibold text-muted-foreground uppercase mb-2"
          >
            {overlayTexts.levelLabel}
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-card-foreground">
              {levelText}
            </span>
            <span class="text-xs text-muted-foreground">•</span>
            <span class="text-sm text-primary font-mono">
              {selectedTech.years}
              {overlayTexts.yearsText}
            </span>
          </div>
        </div>

        <div class="bg-secondary/50 rounded-lg p-3 border border-border">
          <div
            class="text-xs font-semibold text-muted-foreground uppercase mb-2"
          >
            {overlayTexts.descriptionLabel}
          </div>
          <p class="text-sm text-card-foreground leading-relaxed">
            {selectedTech.description || "No description available"}
          </p>
        </div>

        {#if selectedTech.projects && selectedTech.projects.length > 0}
          <div class="bg-secondary/50 rounded-lg p-3 border border-border">
            <div
              class="text-xs font-semibold text-muted-foreground uppercase mb-2"
            >
              {overlayTexts.projectsLabel}
            </div>
            <ul class="space-y-2">
              {#each selectedTech.projects as project}
                <li class="text-sm text-card-foreground flex items-start gap-2">
                  <span class="text-primary font-bold">→</span>
                  <span>{project}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>

      <button
        onclick={onClose}
        class="mt-6 w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium shadow-sm"
      >
        {overlayTexts.closeButton}
      </button>
    </div>
  </div>
{/if}
