import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import useFetchHook from '../../../hooks/useFetchHook';
import { Loader } from '../../layouts/Spinner';
import { formatNumber } from '../../../services/helper';

export const FinanceChart = () => {
    const {  data: transactions } = useFetchHook("/transactions");

    const currentYear = new Date().getFullYear();
    const [clientYear] = useState(currentYear);
    const allYears = [clientYear]

    for (var i = 0; i <= 2; i++) {
        allYears.push(currentYear - i);
    }


    if(!transactions){
        return <center><Loader /></center>
    }

    const orders = transactions.filter((where) => where.type === "Products")

    const projects = transactions.filter((where) => where.type === "Projects")

    const subscribe = transactions.filter((where) => where.type === "Subscription")

    const payout = transactions.filter((where) => where.type === "Project Payout to service partner")

    console.log(transactions)
    
    // for order

    let janOrderMoney = 0, febOrderMoney = 0, marOrderMoney = 0, aprOrderMoney = 0,
        mayOrderMoney = 0, junOrderMoney = 0, julOrderMoney = 0, augOrderMoney = 0, 
        sepOrderMoney = 0, octOrderMoney = 0, novOrderMoney = 0, decOrderMoney = 0;
    
    
    if (orders.length > 0) {
        orders.forEach((item) => {
            if ((new Date(item.createdAt).getMonth() + 1) === 1) {
                janOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
                febOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
                marOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
                aprOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
                mayOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
                junOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
                julOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
                augOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
                sepOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
                octOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
                novOrderMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
                decOrderMoney += item.amount
            }
        })
    }

    // for projects

    let janProjectMoney = 0, febProjectMoney = 0, marProjectMoney = 0, aprProjectMoney = 0,
        mayProjectMoney = 0, junProjectMoney = 0, julProjectMoney = 0, augProjectMoney = 0, 
        sepProjectMoney = 0, octProjectMoney = 0, novProjectMoney = 0, decProjectMoney = 0;

    if (projects.length > 0) {
        projects.forEach((item) => {
            if ((new Date(item.createdAt).getMonth() + 1) === 1) {
                janProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
                febProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
                marProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
                aprProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
                mayProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
                junProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
                julProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
                augProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
                sepProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
                octProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
                novProjectMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
                decProjectMoney += item.amount
            }
        })
    }

    // for subscription

    let janSubMoney = 0, febSubMoney = 0, marSubMoney = 0, aprSubMoney = 0,
        maySubMoney = 0, junSubMoney = 0, julSubMoney = 0, augSubMoney = 0, 
        sepSubMoney = 0, octSubMoney = 0, novSubMoney = 0, decSubMoney = 0;

    if (subscribe.length > 0) {
        subscribe.forEach((item) => {
            if ((new Date(item.createdAt).getMonth() + 1) === 1) {
                janSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
                febSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
                marSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
                aprSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
                maySubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
                junSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
                julSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
                augSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
                sepSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
                octSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
                novSubMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
                decSubMoney += item.amount
            }
        })
    }
    

    // for payout

    let janPayoutMoney = 0, febPayoutMoney = 0, marPayoutMoney = 0, aprPayoutMoney = 0,
        mayPayoutMoney = 0, junPayoutMoney = 0, julPayoutMoney = 0, augPayoutMoney = 0, 
        sepPayoutMoney = 0, octPayoutMoney = 0, novPayoutMoney = 0, decPayoutMoney = 0;

    if (payout.length > 0) {
        payout.forEach((item) => {
            if ((new Date(item.createdAt).getMonth() + 1) === 1) {
                janPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
                febPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
                marPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
                aprPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
                mayPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
                junPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
                julPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
                augPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
                sepPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
                octPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
                novPayoutMoney += item.amount
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
                decPayoutMoney += item.amount
            }
        })
    }

    console.log(payout)
    console.log(janPayoutMoney) 
    console.log(febPayoutMoney)
    console.log(marPayoutMoney)
    console.log(aprPayoutMoney)
    console.log(mayPayoutMoney)

    // chart series and option

    const series = [
        {
        name: 'Orders',
        data: [janOrderMoney, febOrderMoney, marOrderMoney, aprOrderMoney, mayOrderMoney,
             junOrderMoney, julOrderMoney, augOrderMoney, sepOrderMoney, octOrderMoney,
            novOrderMoney, decOrderMoney]
      }, 
      {
        name: 'Projects',
        data: [janProjectMoney, febProjectMoney, marProjectMoney, aprProjectMoney,
                mayProjectMoney, junProjectMoney, julProjectMoney, augProjectMoney,
                sepProjectMoney, octProjectMoney, novProjectMoney, decProjectMoney]
      }, 
      {
        name: 'Subscription',
        data: [janSubMoney, febSubMoney, marSubMoney, aprSubMoney,
                maySubMoney, junSubMoney, julSubMoney, augSubMoney,
                sepSubMoney,octSubMoney, novSubMoney, decSubMoney]
      },
      {
        name: 'Payout',
        data: [janPayoutMoney, febPayoutMoney, marPayoutMoney, aprPayoutMoney,
                mayPayoutMoney, junPayoutMoney, julPayoutMoney, augPayoutMoney,
                sepPayoutMoney, octPayoutMoney, novPayoutMoney, decPayoutMoney]
      }
    ]
    const options = {
        chart: {
          type: 'line',
          height: 450,
          zoom: {
            enabled: true
          },
          toolbar: {
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
            }
            }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          tickPlacement: 'on',
        },
        yaxis: {
          title: {
            text: '₦ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "₦ " + formatNumber(val)
            }
          }
        }
      }


    
  return (
    <div>
        <div className='mt-8 lg:mt-12 p-6 bg-white shadow rounded'>
            <div className='flex justify-between items-center'>
                <p className='lg:text-xl fw-600'>Transaction Analytics</p>
                <select className="border lg:w-36 text-sm px-2 h-8 mr-4 mt-3" >
                    {allYears.map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div className='mt-6'>
                <ReactApexChart options={options} series={series} width="100%" type="bar" height={550}/>
            </div>
        </div>
        {/*  */}
    </div>
  )
}
