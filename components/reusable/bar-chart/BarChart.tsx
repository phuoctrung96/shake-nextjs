import React, { useState, useEffect } from 'react';
import styles from './barChart.module.scss';
import { ResponsiveBar } from '@nivo/bar';
import { AxisTickProps } from '@nivo/axes';
import { useTheme, CartesianMarkerProps } from '@nivo/core';
import { DatumValue } from '@nivo/line';
import { getAllRatingsFromChartData } from '../../../utils/chart';
import { CHART_COLORS } from '../line-chart/LineChart';
import { capitalizeFirstLetter, shortenNumber, formatNumber } from '../../../utils/utils';

type BarChartProps = {
  chartData: BarChartType[];
  selectedCompaniesCount: number;
  companyNames: (string | undefined)[];
  tooltipText: string;
  maxValue?: number;
};

export type BarChartType = {
  name: string;
  company1?: number;
  company2?: number;
  company3?: number;
};

const getMarkerPosition = (countOfRows: number) => {
  let markerPosition: { rest?: number; top?: number } = {};

  switch (countOfRows) {
    case 1:
      markerPosition.top = 40;
      markerPosition.rest = 180;
      break;
    case 2:
      markerPosition.top = 40;
      markerPosition.rest = 120;
      break;
    case 3:
      markerPosition.top = 30;
      markerPosition.rest = 86;
      break;
    case 4:
      markerPosition.top = 20;
      markerPosition.rest = 66;
      break;
    case 5:
      markerPosition.top = 20;
      markerPosition.rest = 55;
      break;
    case 6:
      markerPosition.top = 16;
      markerPosition.rest = 45;
      break;
    case 7:
      markerPosition.top = 12;
      markerPosition.rest = 40;
      break;
    case 8:
      markerPosition.top = 11;
      markerPosition.rest = 36;
      break;
    default:
      markerPosition.top = 11;
      markerPosition.rest = 36;
  }

  return markerPosition;
};

const BarChart = ({
  selectedCompaniesCount,
  chartData,
  tooltipText,
  maxValue,
  companyNames,
}: BarChartProps) => {
  const [width, setWidth] = useState(typeof window === 'undefined' ? 375 : window.innerWidth);

  const allRatings = getAllRatingsFromChartData(chartData);

  const maximumValue = Math.max(...allRatings);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
      });
    }

    return () => {
      window.removeEventListener('resize', () => {});
    };
  });

  const CustomTick = (tick: AxisTickProps<string>) => {
    const theme = useTheme();

    return (
      <g transform={`translate(${tick.x},${tick.y + 10})`}>
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          style={
            tick.tickIndex % 2 === 0
              ? {
                  ...theme.axis.ticks.text,
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.35,
                  fill: '#66717E',
                }
              : {
                  ...theme.axis.ticks.text,
                  fontSize: width > 767 ? 14 : 9,
                  fontWeight: 400,
                  lineHeight: 1.35,
                  fill: '#CCCED3',
                }
          }
        >
          {tick.value}
        </text>
      </g>
    );
  };

  const CustomMarkers = (): CartesianMarkerProps<DatumValue>[] | undefined => {
    let customMarkersArray: CartesianMarkerProps<DatumValue>[] = [];

    chartData.map((data, index) => {
      if (index === 0) {
        customMarkersArray.push({
          axis: 'y',
          value: chartData[chartData.length - 1].name,
          lineStyle: {
            stroke: '#E0E0E0',
            strokeWidth: 1,
            strokeDasharray: '4 4',
            transform: `translateY(-${getMarkerPosition(chartData.length).top}px)`,
          },
          legendOrientation: 'vertical',
        });
      }
      customMarkersArray.push({
        axis: 'y',
        value: data.name,
        lineStyle: {
          stroke: '#E0E0E0',
          strokeWidth: 1,
          strokeDasharray: '4 4',
          transform: `translateY(${getMarkerPosition(chartData.length).rest}px)`,
        },
        legendOrientation: 'vertical',
      });
    });

    return customMarkersArray;
  };

  const getKeys = () => {
    if (selectedCompaniesCount === 1) {
      return ['company1'];
    } else if (selectedCompaniesCount === 2) {
      return ['company1', 'company2'];
    }

    return ['company1', 'company2', 'company3'];
  };

  const getTickValue = () => {
    if (maximumValue <= 5) return 10;

    return width <= 500 ? 2 : 4;
  };

  const longestNameLength = chartData.reduce(
    (acc, curr) => (curr.name.length > acc ? curr.name.length : acc),
    0
  );

  return (
    <div className={styles.chartWrapper}>
      {chartData.length === 0 ? (
        <p>No data to show</p>
      ) : (
        <ResponsiveBar
          data={chartData}
          indexBy="name"
          keys={getKeys()}
          groupMode="grouped"
          layout="horizontal"
          enableGridY={false}
          enableGridX={false}
          enableLabel={false}
          animate={true}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          minValue={0}
          maxValue={maxValue ? maxValue : 'auto'}
          padding={0.5}
          innerPadding={selectedCompaniesCount === 2 ? 8 : 6}
          borderRadius={4}
          colorBy="id"
          colors={CHART_COLORS}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            tickValues: getTickValue(),
            renderTick: CustomTick,
            format: (val) => {
              return val >= 1000 ? val / 1000 + 'k' : val;
            },
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 17,
            tickRotation: 0,
            format: (val) => {
              return capitalizeFirstLetter(val);
            },
          }}
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
              line: {},
            },
          }}
          margin={{ top: 0, right: 50, bottom: 50, left: longestNameLength * 10 }}
          markers={CustomMarkers()}
          labelSkipWidth={11}
          labelSkipHeight={12}
          tooltip={({ indexValue }) => (
            <div className={styles.tooltipWrapper}>
              <p>
                {tooltipText} {capitalizeFirstLetter(indexValue as string)}:
              </p>
              {chartData
                .filter((data) => data.name === indexValue)
                .map((data, index) => {
                  return (
                    <div key={index}>
                      <p style={{ color: CHART_COLORS[0], fontWeight: 700 }}>
                        {companyNames[0]}:{' '}
                        {typeof data.company1 === 'undefined' ? 'N/A' : formatNumber(data.company1)}
                      </p>
                      {companyNames[1] && (
                        <p style={{ color: CHART_COLORS[1], fontWeight: 700 }}>
                          {companyNames[1]}:{' '}
                          {typeof data.company2 === 'undefined'
                            ? 'N/A'
                            : formatNumber(data.company2)}
                        </p>
                      )}
                      {companyNames[2] && (
                        <p style={{ color: CHART_COLORS[2], fontWeight: 700 }}>
                          {companyNames[2]}:{' '}
                          {typeof data.company3 === 'undefined'
                            ? 'N/A'
                            : formatNumber(data.company3)}
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        />
      )}
    </div>
  );
};

export default BarChart;
