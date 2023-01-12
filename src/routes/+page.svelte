<script>
    export let data

    import GraphTopics from "$components/global/GraphTopics.svelte";
</script>

<article>
    <h1>Home</h1>
    
    <p>
        Welcome to my digital garden, a collection of my thoughts, ponderings, and notes on various topics!
    
        Here you'll find blog posts that delve into topics that interest me, help sheets that are quick reference guides, and demos of small, fleeting projects.

        Whether you want to learn something new or just explore different perspectives, I hope you find something useful here. Thanks for visiting!
    </p>
    
    <div>
        <h2>Topics</h2>

        <div class="p-2">
            <GraphTopics nodes={data.nodes} edges={data.edges}/>
        </div>

        <div class="p-5 text-xs columns-2 md:columns-5">
            {#each data.nodes.sort((a, b) => b.count - a.count) as node}
                <div>
                    <a href="#" class="underline">[ {node.count} ]</a> {node.label}
                </div>
            {/each} 
        </div>
    </div>
</article>