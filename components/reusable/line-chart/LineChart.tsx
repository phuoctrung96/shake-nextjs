import React from 'react';
import styles from './lineChart.module.scss';
import { ResponsiveLine, Serie } from '@nivo/line';
import { getMaxValueFromLineChartData } from '../../../utils/chart';

export type LineChartType = {
  month: string;
  company1: number;
  company2?: number;
  company3?: number;
};

type LineChartProps = {
  selectedCompaniesCount: number;
  chartStyle?: 'default' | 'simple';
  chartData: Serie[];
  tooltipText: string;
  wrapperHeight?: string;
  companyNames: string[];
};

export const CHART_COLORS = ['#3772FF', '#FFA630', '#E71D36'];

const CustomPoint = (props: any) => {
  const { currentSlice, colors } = props;

  if (currentSlice?.points[0]) {
    return (
      <svg className={styles.shadow}>
        <g>
          <circle
            r={8}
            strokeWidth={'5'}
            stroke={'#fff'}
            fill={colors[0]}
            cx={currentSlice?.points[0].x}
            cy={currentSlice?.points[0].y}
          />
        </g>
      </svg>
    );
  }
};

const LineChart = ({
  chartStyle = 'default',
  chartData,
  wrapperHeight = '450px',
  tooltipText,
  companyNames,
}: LineChartProps) => {
  const maximumValue = Math.max(...getMaxValueFromLineChartData(chartData));
  const getLeftMargin = (maximumValue: number): number => {
    const countOfDigits = String(maximumValue.toFixed(0)).length;
    const margin = countOfDigits * 10 + 12;

    return margin >= 30 ? margin : 30;
  };

  return (
    <div className={styles.chartWrapper} style={{ height: wrapperHeight }}>
      <ResponsiveLine
        data={chartData}
        margin={
          chartStyle === 'simple'
            ? { top: 5, right: 0, bottom: 2, left: 0 }
            : { top: 20, right: 20, bottom: 30, left: getLeftMargin(maximumValue) }
        }
        xFormat="time:%Y-%m-%d"
        axisLeft={
          chartStyle === 'simple'
            ? null
            : {
                tickSize: 0,
                tickPadding: 15,
                tickRotation: 0,
                format: function (value) {
                  return Number.isInteger(value) ? value : false;
                },
              }
        }
        axisBottom={{ tickSize: 0, tickPadding: 15, tickRotation: 0, tickValues: 10 }}
        yScale={{
          type: 'linear',
          min: 0,
          max: Math.ceil(maximumValue) > 5 ? Math.ceil(maximumValue) : 5,
        }}
        colors={CHART_COLORS}
        curve="monotoneX"
        enablePointLabel={true}
        enableSlices="x"
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #E0E0E0',
                borderRadius: '3px',
                top: '-80px',
                position: 'relative',
              }}
              className={styles.customSliceTooltipWrapper}
            >
              <p>{`${tooltipText} in ${slice.points[0].data.x || ''}`}</p>
              {chartData.map((data, index) => {
                const companyData = slice.points.filter(
                  (point) => point.serieId === 'company' + (index + 1)
                );

                return (
                  <div key={index} className={styles.customSliceTooltip}>
                    <p style={{ color: CHART_COLORS[index], fontWeight: 700 }}>
                      <strong>
                        {companyNames[+data.id.toString().replace('company', '') - 1]}:{' '}
                        {typeof companyData[0] !== 'undefined'
                          ? companyData[0].data.yFormatted
                          : 'N/A'}
                      </strong>
                    </p>
                  </div>
                );
              })}
            </div>
          );
        }}
        pointSize={10}
        layers={[
          'grid',
          'markers',
          'axes',
          'areas',
          'crosshair',
          'lines',
          CustomPoint,
          'slices',
          'mesh',
          'legends',
        ]}
        lineWidth={5}
        areaOpacity={0.85}
        enableCrosshair={false}
        enableGridX={false}
        enableGridY={chartStyle === 'simple' ? false : true}
        useMesh={true}
        theme={{
          axis: {
            ticks: {
              text: {
                fontSize: '14px',
                fontFamily: 'GalanoGrotesque',
                lineHeight: '18.9px',
                fill: '#66717E',
              },
            },
          },
          grid: {
            line: {
              strokeWidth: 2,
              strokeDasharray: '3 4',
              stroke: '#E0E0E0',
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
