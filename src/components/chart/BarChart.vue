<template>
    <div class="chart-container">
        <Bar
                id="bar-chart"
                :options="chartOptions"
                :data="chartData"
        />
    </div>
</template>

<script>
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

    export default {
        name: "BarChart",
        props: ['chartData', 'chartOptions'],
        components: { Bar },

    }
</script>

<style scoped>
    .chart-container {
        width: 800px;
        height: 400px;
    }
</style>
