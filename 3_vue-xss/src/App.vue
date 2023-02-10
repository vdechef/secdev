<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <div class="root">
        <header>
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        </header>
        <main>
            <div class="wrapper">

                <HelloWorld msg="You did it!"></HelloWorld>

            </div>
        </main>
    </div>
</template>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    .root {
        display: flex;
    }
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
