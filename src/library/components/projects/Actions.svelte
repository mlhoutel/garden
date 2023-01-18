<script>
	import { Icon } from "@steeze-ui/svelte-icon";

    export let actions = {}
</script>

<div class="flex flex-col">
    {#each Object.entries(actions) as [, action]}
        <button on:click={action.function} class="text-dark">
            {#if typeof action.label == "string"}
                {action.label}                
            {:else}
                <Icon src={action.label} theme="mini" size="45px"  />
            {/if}
        </button>
    {/each}
</div>
