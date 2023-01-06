<script>
    import ContentList from "$components/lists/ContentList.svelte";

    export let data

    const topics = Object.entries(data.tree)

    function escapedPath(path) { 
        const index = path.lastIndexOf("/")
        return path.slice(0, index) + "-" + path.slice(index+1)
    }

    function toUpper(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    // converted for ContentList component
    const items = topics.map(([title, sheets]) => ({
        label: toUpper(title),
        items: Object.values(sheets).map((e) => ({
            ...e,
            path: escapedPath(e.path),
            title: e.meta.title,
            topic: e.meta.topic,
            short: e.meta.short,
        }))
    }))

    const label = "Go to sheet »"

</script>

<article>
  <h1>Blog</h1>
  
  <ContentList {items} {label} />
</article>
