export interface LineChartData {
  labels: string[],
  datasets: {
    data: number[],
    color: (opacity: number) => string
  }[]
}
