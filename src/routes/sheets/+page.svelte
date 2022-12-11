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
    <h1>Sheets</h1>

    {#each topics as [title, topic]}

        <h2 id={title} class="text-4xl font-bold tracking-widest p-2 pt-7">{toUpper(title)}</h2>

        {#each Object.values(topic) as sheet}
            <div class="p-2">
                <a class="font-bold" href={escapedPath(sheet.path)}>{sheet.meta.title}</a>
                <p class="pt-0 text-sm">
                    {sheet.meta.short || "[No preview available]"}
                    <br/>
                    <a class="font-serif" href={escapedPath(sheet.path)}>Go to sheet »</a>
                </p>
            </div>
        {/each}

    {/each}
</article>



