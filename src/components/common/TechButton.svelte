<script lang="ts">
  interface Props {
    name: string;
    category: string;
    years: string;
    onclick: () => void;
  }

  let { name, category, years, onclick }: Props = $props();
</script>

<button
  {onclick}
  class="tech-button flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-200 cursor-pointer"
>
  <div class="flex-1 min-w-0">
    <div class="font-medium text-card-foreground text-sm">
      {name}
    </div>
    <div class="text-xs text-muted-foreground">{category}</div>
  </div>
  <div class="text-xs font-mono text-primary ml-2 flex-shrink-0">{years}</div>
</button>
