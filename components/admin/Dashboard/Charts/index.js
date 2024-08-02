'use client'
import dynamic from 'next/dynamic'
import React from 'react'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false // Ensure ApexCharts is not imported during SSR
})
const PieChart = () => {

  const pieChart = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        width: 480,
        type: 'donut',
        foreColor: '#fff'
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      labels: [
        'KFC',
        'Ramiz Kebab',
        'Burger king',
        'TGI Fridays',
        'Mc Donalds'
      ],
      dataLabels: {
        enabled: true
      },
      fill: {
        type: 'gradient'
      },
      title: {
        text: 'Projects by account',
        style: {
          fontSize: '12px',
        },
      },
      responsive: [
        {
          breakpoint: 1520,
          options: {
            chart: {
              width: 400,
              height: 400
            },
            legend: {
              position: 'bottom'
            }
          }
        },
        {
          breakpoint: 424,
          options: {
            chart: {
              width: 290,
              height: 272
            },
            legend: {
              position: 'bottom'
            }
          }
        },
      ]
    }
  }
  return (
    <div>
      <ReactApexChart
        options={pieChart.options}
        series={pieChart.series}
        type='donut'
        width={480}
      />
    </div>
  )
}

const SalaryChart = () => {
  const salaryChart = {
    series: [
      {
        name: 'Janunary',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'February',
        data: [11, 32, 45, 32, 34, 52, 41]
      },
      {
        name: 'March',
        data: [9, 27, 33, 36, 37, 66, 77]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        foreColor: '#fff'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ['2019', '2020', '2021', '2022', '2023', '2024']
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      },
      responsive: [
        {
          breakpoint: 1520,
          options: {
            chart: {
              width: 500,
              height: 350
            },
            legend: {
              position: 'bottom'
            }
          }
        },
        {
          breakpoint: 424,
          options: {
            chart: {
              width: 270,
              height: 272
            },
            legend: {
              position: 'bottom'
            }
          }
        },
      ]
    }
  }
  return (
    <div>
      <ReactApexChart
        options={salaryChart.options}
        series={salaryChart.series}
        type='area'
        height={350}
        width={680}
      />
    </div>
  )
}

export { PieChart, SalaryChart }
