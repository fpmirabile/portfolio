<script lang="ts" context="module">
  export type MenuOption = {
    name: string;
    path: string;
  };

  export type ExtraMenuButton = Pick<MenuOption, "name"> & {
    action: () => void;
  };

  export type Menu = {
    options: MenuOption[];
    extraOptions: ExtraMenuButton[];
  };
</script>

<script lang="ts">
  export let menu: Menu;
</script>

<nav class="flex-1 bg-gray-800 text-white shadow-lg">
  <div class="container mx-auto p-4">
    <div class="flex">
      <ul class="flex items-center space-x-4">
        {#each menu.options as opt}
          <li>
            <a
              href={opt.path}
              class="hover:bg-gray-700 px-3 py-2 rounded transition duration-300"
              >{opt.name}</a
            >
          </li>
        {/each}
        {#each menu.extraOptions as opt}
          <button
            class="ml-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300"
            on:click={opt.action}>{opt.name}</button
          >
        {/each}
      </ul>
    </div>
  </div>
</nav>
