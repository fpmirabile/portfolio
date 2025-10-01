<script lang="ts">
  import classNames from "classnames";

  interface Props {
    year: string;
    title: string;
    description: string;
    tech: string[];
    align?: "left" | "right";
    variant?: "work" | "side";
    url?: string;
    status?: string;
    role?: string;
  }

  let {
    year,
    title,
    description,
    tech,
    align = "left",
    variant = "work",
    url = undefined,
    status = undefined,
    role = undefined,
  }: Props = $props();

  const isLeft = $derived(align === "left");
  const isSideProject = $derived(variant === "side");

  const containerClass = $derived(
    classNames({
      "lg:text-right": isLeft,
    })
  );

  const cardClass = $derived(
    classNames(
      "bg-card rounded-xl p-6 hover:shadow-lg transition-all duration-300",
      {
        "border-2 border-purple-500/20 hover:border-purple-500/40":
          isSideProject,
        "border border-border hover:border-primary/30": !isSideProject,
      }
    )
  );

  const yearClass = $derived(
    classNames("text-sm font-semibold px-3 py-1 rounded-full", {
      "text-purple-500 bg-purple-500/10": isSideProject,
      "text-primary": !isSideProject,
    })
  );

  const yearContainerClass = $derived(
    classNames("flex items-center gap-2 mb-2", {
      "lg:justify-end": isLeft,
    })
  );

  const linkClass = $derived(
    classNames(
      "text-xl font-bold text-foreground transition-colors inline-flex items-center gap-2 group",
      {
        "hover:text-purple-500": isSideProject,
        "hover:text-primary": !isSideProject,
      }
    )
  );

  const roleClass = $derived(
    classNames("text-sm font-medium mt-1", {
      "text-purple-500": isSideProject,
      "text-primary": !isSideProject,
    })
  );

  const techContainerClass = $derived(
    classNames("flex flex-wrap gap-2", {
      "lg:justify-end": isLeft,
    })
  );

  const techClass = $derived(
    classNames("text-xs px-3 py-1 rounded-full font-medium", {
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20":
        isSideProject,
      "bg-primary/10 text-primary": !isSideProject,
    })
  );
</script>

<div class={containerClass}>
  <div class={cardClass}>
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <div class={yearContainerClass}>
          <span class={yearClass}>
            {year}
          </span>
          {#if status}
            <span
              class="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full capitalize"
            >
              {status}
            </span>
          {/if}
        </div>

        {#if url}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            class={linkClass}
          >
            {title}
            <svg
              class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        {:else}
          <h3 class="text-xl font-semibold text-card-foreground">
            {title}
          </h3>
        {/if}

        {#if role}
          <p class={roleClass}>{role}</p>
        {/if}
      </div>
    </div>

    <p class="text-muted-foreground mb-4 leading-relaxed">
      {description}
    </p>

    <div class={techContainerClass}>
      {#each tech as techItem}
        <span class={techClass}>
          {techItem}
        </span>
      {/each}
    </div>
  </div>
</div>
