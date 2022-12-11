<script>
    import { browser } from '$app/environment';
</script>

<div>
    {#if browser}
        <slot></slot>
    {/if}
</div>

