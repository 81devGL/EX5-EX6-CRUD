import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getOrders } from '../../../ApiService/ApiOrder';
import { Last7Days, numberWithCommas, removeString } from '../../Function/Function';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        intersect: false,
    },

    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: { maxTicksLimit: 10 },
        },
        y: {
            grid: {
                drawBorder: false,
                tickLength: 40,
            },

            ticks: {
                max: 250000000,
                min: 1,
                stepSize: 30000,
                callback: (context, index) => {
                    if (context > 0) {
                        return numberWithCommas(context) + 'k';
                    } else {
                        return context;
                    }
                },
            },
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null && context.parsed.y !== 0) {
                        label += `${numberWithCommas(context.parsed.y)}k`;
                    }
                    return label;
                },
            },
        },
        legend: {
            display: false,
        },
    },
};

export function Chartjs() {
    const [orders, setOrders] = useState([]);
    const [labelk, setLablek] = useState();
    const dataOrder = useRef();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                // get today and last 7 days
                const orderItem = await getOrders();
                let date = await new Date();
                let last = await new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();
                if (month < 10) month = '0' + month;
                if (day < 10) day = '0' + day;
                let lastday = last.getDate();
                let lastMo = last.getMonth() + 1;
                let lastY = last.getFullYear();
                if (lastMo < 10) lastMo = '0' + lastMo;
                if (lastday < 10) lastday = '0' + lastday;
                let lastfday = lastY + lastMo + lastday;
                let today = year + month + day;
                await setLablek(Last7Days().split(','));
                const arrayreport = await orderItem.filter((item) => {
                    const dateCreate = parseFloat(removeString(item.createDate));
                    return dateCreate >= parseFloat(lastfday) && dateCreate <= parseFloat(today);
                });
                if (arrayreport) {
                    setOrders(arrayreport);
                } else setOrders(orderItem);

                dataOrder.current = orderItem;
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    let label;
    let pro;
    if (labelk) {
        label = [...labelk].reverse().map((item) => {
            return `2022,${item.split('/').reverse().toString()}`;
        });
        pro = label.map((e) => {
            e = { date: e, totalCard: 0 };
            let num = orders.filter((element) => removeString(element.createDate) === removeString(e.date));
            if (num.length >= 1) {
                const total = num.reduce((agr, item) => {
                    agr += item.total;
                    return agr;
                }, 0);
                e.totalCard = total / 1000;
            }
            return e.totalCard;
        });
    }

    const data = {
        labels: label,
        datasets: [
            {
                data: pro,
                borderColor: '#0e9f6e',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                pointStyle: 'circle',
                pointRadius: 1,
            },
        ],
    };
    return <Line options={options} data={data} />;
}
