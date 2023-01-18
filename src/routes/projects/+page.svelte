<script>
    import ContentList from "$components/lists/ContentList.svelte";

    export let data

    const items = [{
        label: "Demos",
        items: data.projects.map((e) => {
            const title = e.path.split("/").at(-1)
           return {
                ...e,
                title: title.charAt(0).toUpperCase() + title.slice(1),
                short: e.meta.short,
                topic: e.meta.topic
            }
        })
    }]

    const label = "Go to project »"
</script>

<article class="px-3 pt-14 pb-10">
    <h1>Projects</h1>
    
    <ContentList {items} {label} />
</article>

