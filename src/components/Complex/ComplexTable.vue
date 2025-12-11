<script setup lang="ts">
import {computed} from "vue"

const props = defineProps<{
    headers: string[]
    rows: (string | number)[][]
    striped?: boolean
    compact?: boolean
}>()

const tableClass = computed(() => ({
    striped: props.striped,
    compact: props.compact
}))
</script>

<template>
    <table :class="tableClass">
        <thead>
            <tr>
                <th v-for="(h, i) in props.headers" :key="i">
                    {{ h }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(row, rIndex) in props.rows" :key="rIndex">
                <td v-for="(cell, cIndex) in row" :key="cIndex">
                    {{ cell }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped lang="scss">
table {
    width: 100%;
    border-collapse: collapse;
    background: #1a1a1a;
    color: #eee;
    font-family: var(--font-main);

    th,
    td {
        border: 1px solid #515151;
        padding: 10px;
        text-align: left;
    }

    &.striped {
        tbody {
            tr:nth-child(odd) {
                background: #232D28;
            }
        }
    }

    &.compact {
        th,
        td {
            padding: 6px 8px;
        }
    }
}
</style>
