<template>
    <div style="display: flex; justify-content: space-between">
        <bar-chart :chart-data="barChartData" :chart-options="barChartOptions"/>
        <pie-chart :chart-data="pieChartData" :chart-options="pieChartOptions"/>
    </div>
</template>

<script>
    import BarChart from "@/components/chart/BarChart";
    import PieChart from "@/components/chart/PieChart";
    export default {
        name: "WellChart",
        components: {PieChart, BarChart},
        props: ['payload'],
        data() {
            return {
                pieChartData: this.getPieChartData(),
                pieChartOptions: this.getPieChartOptions(),
                barChartData: this.getBarChartData(),
                barChartOptions: {
                    responsive: true
                }
            }
        },

        watch: {
            payload: {
                handler() {
                    // Update chart data when payload changes
                    this.barChartData = this.getBarChartData();
                    this.pieChartData = this.getPieChartData();
                },
                deep: true
            }
        },
        methods: {
            getPieChartData() {
                return {
                    labels: this.payload.map(item => item.well_number),
                    datasets: [
                        {
                            label: 'Дебит нефти',
                            data: this.payload.map(item => item.oil_rate),
                            backgroundColor: this.payload.map(() => this.getRandomColor()), // Different colors for each slice
                            borderColor: 'rgba(255, 255, 255, 1)', // White borders between slices
                            borderWidth: 1
                        }
                    ]
                }
            },
            getBarChartData() {
                return {
                    labels: this.payload.map(item => item.well_number),
                    datasets: [
                        {
                            label: 'Q жидкости',
                            data: this.payload.map(item => item.liquid_flow),
                            backgroundColor: this.getRandomColor(),
                            borderColor: this.getRandomColor(),
                            borderWidth: 1
                        },
                        {
                            label: 'Обводненность',
                            data: this.payload.map(item => item.water_cut),
                            backgroundColor: this.getRandomColor(),
                            borderColor: this.getRandomColor(),
                            borderWidth: 1
                        },
                        {
                            label: 'Плотность нефти',
                            data: this.payload.map(item => item.oil_density),
                            backgroundColor: this.getRandomColor(),
                            borderColor: this.getRandomColor(),
                            borderWidth: 1
                        },
                        {
                            label: 'Дебит нефти',
                            data: this.payload.map(item => item.oil_rate),
                            backgroundColor: this.getRandomColor(),
                            borderColor: this.getRandomColor(),
                            borderWidth: 1
                        }
                    ]
                }
            },

            getPieChartOptions() {
                const total = this.getTotalOilRate();
                return {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: `Total Oil Rate: ${total}`, // Displaying total in chart title
                            font: {
                                size: 18
                            }
                        }
                    }
                }
            },
            getTotalOilRate() {
                return this.payload.reduce((total, item) => total + item.oil_rate, 0); // Summing oil_rate
            },
            getRandomColor() {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                return `rgba(${r}, ${g}, ${b}, 0.6)`; // Random RGBA color with transparency
            }
        },
    }
</script>

<style scoped>

</style>