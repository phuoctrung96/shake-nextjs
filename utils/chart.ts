import { Serie } from '@nivo/line';
import { BarChartType } from '../components/reusable/bar-chart/BarChart';

export const getAllRatingsFromChartData = (chartData: BarChartType[]): number[] => {
  let allRatings: number[] = [];

  for (var i = 0; i < chartData.length; i++) {
    if (chartData[i].company3 && chartData[i].company2) {
      allRatings.push(
        chartData[i].company1 || 0,
        chartData[i].company2 || 0,
        chartData[i].company3 || 0
      );
      continue;
    } else if (chartData[i].company2) {
      allRatings.push(chartData[i].company1 || 0, chartData[i].company2 || 0);
      continue;
    }

    allRatings.push(chartData[i].company1 || 0);
  }

  return allRatings;
};

export const getMaxValueFromLineChartData = (chartData: Serie[]) => {
  return chartData.map((chartItem) => {
    const yAxisValues = chartItem.data.map((item) => item.y);

    const filteredYAxisValue = yAxisValues.filter(
      (item) => item !== 'undefined' && item && typeof item === 'number'
    ) as number[];

    return filteredYAxisValue.reduce((acc, curr) => (curr > acc ? curr : acc), 0);
  });
};
