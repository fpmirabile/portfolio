<script lang="ts">
  import { onMount } from "svelte";
  import type { Certification } from "../../types";
  import CarouselButton from "./CarouselButton.svelte";
  import InfoCard from "./InfoCard.svelte";

  interface Props {
    certifications: Certification[];
    counterText: string;
    certificationTypes: {
      certification: string;
      course: string;
      specialization: string;
    };
  }

  let { certifications, counterText, certificationTypes }: Props = $props();

  let currentIndex = $state(0);
  let intervalId: number | null = null;
  let isPaused = $state(false);

  const currentCert = $derived(certifications[currentIndex]);
  const counter = $derived(
    `${currentIndex + 1} de ${certifications.length} ${counterText}`
  );

  function next() {
    currentIndex = (currentIndex + 1) % certifications.length;
  }

  function previous() {
    currentIndex =
      currentIndex === 0 ? certifications.length - 1 : currentIndex - 1;
  }

  function goTo(index: number) {
    if (index >= 0 && index < certifications.length) {
      currentIndex = index;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (certifications.length > 1 && !isPaused) {
      intervalId = window.setInterval(() => {
        next();
      }, 4000);
    }
  }

  function stopAutoPlay() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function handleMouseEnter() {
    isPaused = true;
    stopAutoPlay();
  }

  function handleMouseLeave() {
    isPaused = false;
    startAutoPlay();
  }

  function handlePrevClick() {
    previous();
    stopAutoPlay();
    startAutoPlay();
  }

  function handleNextClick() {
    next();
    stopAutoPlay();
    startAutoPlay();
  }

  function handleIndicatorClick(index: number) {
    goTo(index);
    stopAutoPlay();
    startAutoPlay();
  }

  onMount(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  });
</script>

<div
  class="group relative bg-card border border-border rounded-xl p-6 h-[200px] overflow-hidden"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="region"
  aria-label="Certification Carousel"
>
  <!-- Carousel Content -->
  <div class="absolute inset-6 flex items-center justify-center">
    {#key currentIndex}
      <InfoCard
        badge={certificationTypes[currentCert.type as keyof typeof certificationTypes]}
        title={currentCert.name}
        subtitle={currentCert.issuer}
        footer={currentCert.year.toString()}
        animate={true}
      />
    {/key}
  </div>

  <!-- Carousel Indicators -->
  <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
    {#each certifications as _, i}
      <button
        class="carousel-indicator w-2 h-2 rounded-full transition-all duration-200 {i ===
        currentIndex
          ? 'bg-primary'
          : 'bg-muted-foreground/30'}"
        onclick={() => handleIndicatorClick(i)}
        aria-label="Go to item {i + 1}"
      ></button>
    {/each}
  </div>

  <!-- Navigation Arrows -->
  <CarouselButton direction="prev" onclick={handlePrevClick} />
  <CarouselButton direction="next" onclick={handleNextClick} />
</div>

<div class="mt-4 text-center">
  <p class="text-xs text-muted-foreground">
    {counter}
  </p>
</div>
