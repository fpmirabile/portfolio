<script lang="ts">
  import classNames from "classnames";
  import ProjectCard from "./ProjectCard.svelte";

  interface TimelineItem {
    year: string;
    title: string;
    description: string;
    tech: string[];
    url?: string;
    status?: string;
    role?: string;
  }

  interface Props {
    items: TimelineItem[];
    variant?: "work" | "side";
  }

  let { items, variant = "work" }: Props = $props();

  const isSideProject = $derived(variant === "side");

  const lineClass = $derived(
    classNames(
      "absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-0.5 lg:w-1 h-full",
      {
        "bg-purple-500/30": isSideProject,
        "bg-primary/30": !isSideProject,
      }
    )
  );

  const dotClass = $derived(
    classNames("rounded-full border-4 border-background shadow-lg ring-4", {
      "bg-purple-500 ring-purple-500/30": isSideProject,
      "bg-primary ring-primary/30": !isSideProject,
    })
  );

  const dotClassDesktop = $derived(
    classNames(
      "w-6 h-6 rounded-full border-[5px] border-background shadow-xl ring-4",
      {
        "bg-purple-500 ring-purple-500/20": isSideProject,
        "bg-primary ring-primary/20": !isSideProject,
      }
    )
  );
</script>

<div class="relative">
  <!-- Timeline Line -->
  <div class={lineClass}></div>

  <div class="space-y-8 lg:space-y-16">
    {#each items as item, i}
      <div
        class="animate-fade-in-up relative"
        style={`animation-delay: ${i * 0.1}s`}
      >
        <!-- Mobile Layout -->
        <div class="lg:hidden flex gap-4 items-start">
          <div
            class="flex-shrink-0 flex justify-center items-center relative z-10 pt-2"
          >
            <div class={`w-8 h-8 ${dotClass}`}></div>
          </div>

          <div class="flex-1">
            <ProjectCard
              year={item.year}
              title={item.title}
              description={item.description}
              tech={item.tech}
              align="left"
              {variant}
              url={item.url}
              status={item.status}
              role={item.role}
            />
          </div>
        </div>

        <!-- Desktop Layout - Alternating sides -->
        <div
          class="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center"
        >
          {#if i % 2 === 0}
            <!-- Left Side -->
            <ProjectCard
              year={item.year}
              title={item.title}
              description={item.description}
              tech={item.tech}
              align="left"
              {variant}
              url={item.url}
              status={item.status}
              role={item.role}
            />

            <!-- Timeline Dot -->
            <div class="flex justify-center items-center relative z-10">
              <div class={dotClassDesktop}></div>
            </div>

            <!-- Empty Right Side -->
            <div></div>
          {:else}
            <!-- Empty Left Side -->
            <div></div>

            <!-- Timeline Dot -->
            <div class="flex justify-center items-center relative z-10">
              <div class={dotClassDesktop}></div>
            </div>

            <!-- Right Side -->
            <ProjectCard
              year={item.year}
              title={item.title}
              description={item.description}
              tech={item.tech}
              align="right"
              {variant}
              url={item.url}
              status={item.status}
              role={item.role}
            />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
