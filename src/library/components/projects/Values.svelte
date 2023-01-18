<script>
    export let values = {}

    const initial_values = {}

    for (const [label, value] of Object.entries(values)) {
        if (variable(value)) {
            initial_values[label] = {
                value: value,
                min: Math.round(value/10),
                max: Math.round(value*4)
            }
        }
    }

    function variable(value) {
        return typeof value == "number" || typeof value == "string" || typeof value == "boolean"
    }
</script>

<div class="flex flex-col">
    {#each Object.entries(values) as [label, value]}
        {#if initial_values[label] != undefined}
            <label class="text-dark">
                <span>{label}</span>

                {#if typeof value == "number"}
                    <input type="range" bind:value={values[label]} min={initial_values[label].min} max={initial_values[label].max} step="1" class="bg-dark accent-dark" />
                {:else if typeof value == "string"}
                    <input type="color" bind:value={values[label]} />
                {:else if  typeof value == "boolean"}
                    <input type="checkbox" bind:checked={values[label]}  />
                {/if}

                <span>{value}</span>
            </label>
        {/if}
    {/each}
</div>
