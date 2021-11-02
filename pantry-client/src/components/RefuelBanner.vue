<template>
    <section class="hero is-refuelgrey">
        <div class="hero-body">
            <p class="title">
                {{ title }}
            </p>
            <p v-if="subtitle" class="subtitle">
                {{ subtitle }}
            </p>
        </div>
    </section>
</template>

<script>
export default {
    name: "RefuelBanner",
    props: {
        title: String,
        subtitle: String,
    },
}
</script>