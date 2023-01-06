<script>
  import ContentList from "$components/lists/ContentList.svelte";

  export let data

  const years = data.years ?? []

  // converted for ContentList component
  const items = years.map((i) => ({
    label: i.date,
    items: i.posts.map((e) => ({
      ...e,
      title: e.meta.title,
      topic: e.meta.topic,
      short: e.meta.short
    }))
  }))

  const label = "Read full post »"

</script>

<article>
  <h1>Blog</h1>
  
  <ContentList {items} {label} />
</article>
