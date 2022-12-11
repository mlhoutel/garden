<script>
    export let items = [];
</script>

<div class="inline-flex items-center space-x-1">
    {#each items as item, i}
        <span>
            {#if i === items.length - 1}
                {item.text}
            {:else}
                <a href={item.href} class="underline">{item.text}</a> /
            {/if}
        </span>
    {/each}
</div>