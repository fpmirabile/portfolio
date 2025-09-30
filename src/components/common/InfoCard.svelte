<script lang="ts">
  interface Props {
    badge: string;
    title: string;
    subtitle: string;
    footer: string;
    animate?: boolean;
  }

  let { badge, title, subtitle, footer, animate = false }: Props = $props();
</script>

<div class="text-center {animate ? 'animate-fade-in' : ''}">
  <div class="flex items-center justify-center mb-3">
    <span
      class="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium"
    >
      {badge}
    </span>
  </div>

  <h4 class="font-semibold text-card-foreground mb-2 text-sm leading-tight">
    {title}
  </h4>

  <p class="text-sm text-muted-foreground mb-2">
    {subtitle}
  </p>

  <p class="text-xs text-primary">
    {footer}
  </p>
</div>
