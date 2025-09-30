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

<div class="relative">
  <!-- Interactive Demo Overlay -->
  <SkillDemoOverlay
    {overlayTexts}
    {levels}
    {selectedTech}
    onClose={handleClose}
  />

  <div class="grid grid-cols-2 gap-3">
    {#each technologies as tech}
      <TechButton
        name={tech.name}
        category={tech.category}
        years={tech.years}
        onclick={() => handleTechClick(tech)}
      />
    {/each}
  </div>
</div>
