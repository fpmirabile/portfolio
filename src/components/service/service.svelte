<script lang="ts">
  export let title: string;
  export let description: string;
  export let pathToImage: string;
</script>

<div class="mb-6">
  <h3 class="text-xl font-semibold mb-2">{title}</h3>
  <p class="text-gray-400 mb-2">
    {description}
  </p>
  <img
    class="w-20 h-20 object-cover rounded shadow-lg"
    src={pathToImage}
    alt={title}
  />
</div>
