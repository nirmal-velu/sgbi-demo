import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ProgressBar = () => {
    const [chartState, setChartState] = useState({
        series: [26, 35, 35],
        options: {
            chart: {
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 10,
                },
            },
            grid: {
                padding: {
                    bottom: -80,
                },
            },
            colors: ['#008000', '#F4C724', '#FF0000'], // Yellow, Green, Red
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    });

    return (
        <div className='chart-container'>
            <div id="chart">
                <ReactApexChart options={chartState.options} series={chartState.series} type="donut" />
            </div>
            <div style={{display:"flex",justifyContent:"space-around",width:"400px"}}>
                <div>
                    <span style={{color:"#008000"}}>26</span>
                    <p>Completed</p>
                </div>
                <div>
                    <span style={{color:"#F4C724"}}>35</span>
                    <p>Delayed</p>
                </div>
                <div>
                    <span style={{color:"#FF0000"}}>35</span>
                    <p>On going</p>
                </div>
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ProgressBar;
