<template>
    <div class="chart-container">
        <Pie id="pie-chart"
             :options="chartOptions"
             :data="chartData" />
    </div>

</template>

<script>
    import { Pie } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

    export default {
        name: "PieChart",
        components: { Pie },
        props: ['chartData', 'chartOptions'],


        watch: {
            payload: {
                handler() {
                    this.chartData = this.getChartData(); // Update chart data when payload changes
                    this.chartOptions.plugins.title.text = `Total Oil Rate: ${this.getTotalOilRate()}`; // Update total in chart options
                },
                deep: true // Watch for changes in the payload object
            }
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 600px;
        height: 400px;
    }
</style>
