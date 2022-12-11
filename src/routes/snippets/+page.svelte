<script>
export let data

const topics = Object.entries(data.tree)

function escapedPath(path) { 
    const index = path.lastIndexOf("/")
    return path.slice(0, index) + "-" + path.slice(index+1)
}

function toUpper(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}
</script>

<article>
    <h1>Snippets</h1>

    {#each topics as [title, topic]}

        <h2 id={title} class="text-4xl font-bold tracking-widest p-2 pt-7">{toUpper(title)}</h2>

        {#each Object.values(topic) as snippet}
            <div class="p-2">
                <a class="font-bold" href={escapedPath(snippet.path)}>{snippet.meta?.title}</a>
                <p class="pt-0 text-sm">
                    {snippet.meta.short || "[No preview available]"}
                    <br/>
                    <a class="font-serif" href={escapedPath(snippet.path)}>Go to snippet »</a>
                </p>
            </div>
        {/each}

    {/each}
</article>


