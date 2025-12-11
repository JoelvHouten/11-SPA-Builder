<script setup lang="ts">

const props = defineProps({
    name: { type: String },
    job: { type: String },
    img: { type: String }
})

</script>

<template>
    <transition name="fade">
        <div class="card">
            <img :src="props.img" alt="avatar" style="width:100%" />
            <div class="container">
                <h3><b>{{ props.name }}</b></h3>
                <p>{{ props.job }}</p>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    transition: 0.3s;
    max-width: 130px;
    margin: 10px;
    background: rgb(198, 198, 198);
    font-family: var(--font-main);
    font-size: 1rem;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
    }
}

.container {
    padding: 2px 16px;
    font-weight: 500; 
}
</style>