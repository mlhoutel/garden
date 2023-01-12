<script>
    import TopicPill from "$components/global/TopicPill.svelte";

    export let item
    export let label
</script>

<div>
    <div class="block md:inline-flex">
    <a class="md:w-auto whitespace-nowrap text-clip" href={item.path}>
        <h3>{item.title}</h3>
    </a>
    
    <div class="pills md:pt-[22px] md:pl-3">
        {#if item.topic}
            {#each item.topic.split(" ") as topic}
                <TopicPill {topic} />
            {/each}
        {/if}
    </div>
    </div>

    <p class="pt-0 text-sm">
        {#if item.short}{item.short}...<br/>{/if}

        <a class="font-serif" href={item.path}>{label}</a>
    </p>
</div>