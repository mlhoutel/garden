<script>
export let data

const years = data.years ?? []

</script>

<article>
  <h1>Blog</h1>
    
  <div>
    {#each years as year}
    
    <section>
      <h2 class="text-5xl font-bold tracking-widest p-2">{year.date}</h2>
      
      {#each year.posts as post}
        <div class="p-2">
          <a class="font-bold" href={post.path}>{post.meta.title}</a>
          <p class="pt-0 text-sm">
            {post.meta.short || "[No preview available]"}
            <br/>
            <a class="font-serif" href={post.path}>Read full post »</a>
          </p>
          
        </div>
      {/each}
    </section>

    {/each}
  </div>
</article>
