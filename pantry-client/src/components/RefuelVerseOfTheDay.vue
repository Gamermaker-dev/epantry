<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column">
                   <b-message
                     :title="verseRef"
                     type="is-refuel">
                     {{ verse }}
                   </b-message>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "RefuelVerseOfTheDay",
    props: {
        verseRef: String,
        verse: String,
    },
}
</script>