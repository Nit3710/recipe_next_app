'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';

type ChartType = 'pie' | 'bar' | 'line' | 'negative-bar' | 'doughnut' | 'scrollable-pie';

const DynamicChartComponent: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('pie');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState<{ name: string; value: number }[]>([
    { name: 'Product A', value: 200 },
    { name: 'Product B', value: 150 },
    { name: 'Product C', value: 300 },
  ]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      chartInstance.current?.resize();
    }, 100)
  }

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ECharts | null>(null);

  const generateRandomData = () => {
    return [
      { name: 'Product A', value: Math.floor(Math.random() * 500) },
      { name: 'Product B', value: Math.floor(Math.random() * 500) },
      { name: 'Product C', value: Math.floor(Math.random() * 500) },
      { name: 'Product D', value: Math.floor(Math.random() * 500) },
    ];
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    const theme = isDarkMode ? 'dark' : undefined;
    chartInstance.current = echarts.init(chartRef.current, theme);

    const option = getChartOption(chartType, data);
    chartInstance.current.setOption(option);
  }, [isDarkMode]);

  useEffect(() => {
    if (chartInstance.current) {
      const updatedOption = getChartOption(chartType, data);
      chartInstance.current.setOption(updatedOption);
    }
  }, [chartType, data]);

  const getChartOption = (type: ChartType, data: { name: string; value: number }[]) => {
    switch (type) {
      case 'pie':
        return {
          title: {
            text: 'Simulated Real-Time Data',
            subtext: 'Updating Every Few Seconds',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          series: [
            {
              name: 'Sales Distribution',
              type: 'pie',
              radius: ['40%', '70%'],
              data: data,
            },
          ],
        };
      case 'bar':
        return {
          title: {
            text: 'Sales Data',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            type: 'category',
            data: data.map((item) => item.name),
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: data.map((item) => item.value),
              type: 'bar',
              barWidth: '60%',
            },
          ],
        };
      case 'line':
        return {
          title: {
            text: 'Sales Trend',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: data.map((item) => item.name),
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: data.map((item) => item.value),
              type: 'line',
              smooth: true,
            },
          ],
        };
      case 'negative-bar':
        return {
          title: {
            text: 'Negative Bar Chart',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          xAxis: {
            type: 'category',
            data: data.map((item) => item.name),
          },
          yAxis: {
            type: 'value',
            min: -500,
          },
          series: [
            {
              data: data.map((item) => item.value),
              type: 'bar',
              barWidth: '60%',
              itemStyle: {
                color: function (params: { value: number }) {
                  return params.value < 0 ? '#FF6347' : '#32CD32';
                },
              },
            },
          ],
        };
      case 'doughnut':
        return {
          title: {
            text: 'Sales Distribution (Doughnut)',
            subtext: 'Real-Time Data',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          series: [
            {
              name: 'Sales',
              type: 'pie',
              radius: ['40%', '70%'],
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        };
      case 'scrollable-pie':
        return {
          title: {
            text: 'Scrollable Pie Chart',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
          },
          series: [
            {
              name: 'Sales Distribution',
              type: 'pie',
              radius: ['40%', '70%'],
              data: data,
              roseType: 'area',
            },
          ],
          grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            top: '5%',
          },
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              filterMode: 'filter',
            },
          ],
        };
      default:
        return {};
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = generateRandomData();
      setData(newData);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'dark bg-gray-900 text-white' : 'text-gray-900'}`}>
      <div className="mx-auto px-4 py-6 w-full max-w-6xl flex flex-col gap-6">


        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <label className="text-base font-semibold">Chart Type:</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as ChartType)}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg border 
              ${isDarkMode
                  ? 'border-gray-600 bg-gray-800 text-white'
                  : 'border-gray-300 bg-white text-gray-700'} 
              shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {[
                { value: 'pie', label: 'Pie Chart' },
                { value: 'bar', label: 'Bar Chart' },
                { value: 'line', label: 'Line Chart' },
                { value: 'negative-bar', label: 'Negative Bar' },
                { value: 'doughnut', label: 'Doughnut Chart' },
                { value: 'scrollable-pie', label: 'Scrollable Pie' },
              ].map(opt => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className={`${isDarkMode
                    ? 'text-white bg-gray-800'
                    : 'text-gray-700 bg-white'}`}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Toggle Theme"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
            </button>
          </div>
        </div>

        <div
          ref={chartRef}
          key={isDarkMode ? 'dark' : 'light'}
          className={`relative w-full rounded-xl shadow-lg border 
                    border-gray-200 dark:border-gray-700 
                    ${isFullscreen ? 'fixed inset-0 z-50 m-0 p-4 bg-white dark:bg-gray-900' : 'bg-white h-[400px]'}`}
          style={{ height: isFullscreen ? '100vh' : undefined }}
        />
      </div>
    </div>


  );
};

export default DynamicChartComponent;
