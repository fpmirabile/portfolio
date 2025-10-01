<script lang="ts">
  import type { Technology } from "../../types";
  import TechButton from "./TechButton.svelte";
  import SkillDemoOverlay from "./SkillDemoOverlay.svelte";

  interface Props {
    technologies: Technology[];
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
  }

  let { technologies, overlayTexts, levels }: Props = $props();

  let selectedTech = $state<Technology | null>(null);

  function handleTechClick(tech: Technology) {
    selectedTech = tech;
  }

  function handleClose() {
    selectedTech = null;
  }
</script>

<div class="relative tech-stack-wrapper">
  {#if selectedTech === null}
    <div class="grid grid-cols-2 gap-3 tech-stack-scroll">
      {#each technologies as tech}
        <TechButton
          name={tech.name}
          category={tech.category}
          years={tech.years}
          onclick={() => handleTechClick(tech)}
        />
      {/each}
    </div>
  {:else}
    <SkillDemoOverlay
      {overlayTexts}
      {levels}
      {selectedTech}
      onClose={handleClose}
    />
  {/if}
</div>

<style>
  .tech-stack-wrapper {
    height: 100%;
    min-height: 0;
  }

  .tech-stack-scroll {
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 8px;
  }

  /* Custom scrollbar styling */
  .tech-stack-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .tech-stack-scroll::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  .tech-stack-scroll::-webkit-scrollbar-thumb {
    background: rgba(96, 165, 250, 0.3);
    border-radius: 3px;
  }

  .tech-stack-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(96, 165, 250, 0.5);
  }

  .tech-stack-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(96, 165, 250, 0.3) rgba(255, 255, 255, 0.05);
  }
</style>
