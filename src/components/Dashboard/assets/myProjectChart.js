import React from "react";
import ReactApexChart from "react-apexcharts";


export default function MyProjectChart({ ongoing, completed, pending }) {

    let janOngoing = 0, febOngoing = 0, marOngoing = 0, aprOngoing = 0, mayOngoing = 0,
        junOngoing = 0, julOngoing = 0, augOngoing = 0, sepOngoing = 0, octOngoing = 0, novOngoing = 0, decOngoing = 0;

    if (ongoing.length > 0) {
        ongoing.forEach((item) => {
            if ((new Date(item.createdAt).getMonth() + 1) === 1) {
                janOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
                febOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
                marOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
                aprOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
                mayOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
                junOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
                julOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
                augOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
                sepOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
                octOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
                novOngoing += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
                decOngoing += 1
            }
        })
    }




    let janPending = 0, febPending = 0, marPending = 0, aprPending = 0, mayPending = 0,
        junPending = 0, julPending = 0, augPending = 0, sepPending = 0, octPending = 0, novPending = 0, decPending = 0;

    if (pending.length > 0) {
        pending.forEach((item) => {
            if ((new Date(item.createdAt).getMonth() + 1) === 1) {
                janPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
                febPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
                marPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
                aprPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
                mayPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
                junPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
                julPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
                augPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
                sepPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
                octPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
                novPending += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
                decPending += 1
            }
        })
    }




    let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;

    if (completed.length > 0) {
        completed.forEach((item) => {
            if ((new Date(item.createdAt).getMonth() + 1) === 1) {
                jan += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
                feb += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
                mar += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
                apr += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
                may += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
                jun += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
                jul += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
                aug += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
                sep += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
                oct += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
                nov += 1
            }
            else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
                dec += 1
            }
        })
    }

    const series = [
        {
            name: "Pending",
            data: [janPending, febPending, marPending, aprPending, mayPending, junPending, julPending,
                augPending, sepPending, octPending, novPending, decPending]
        },
        {
            name: "Completed",
            data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
        },
        {
            name: "Ongoing",
            data: [janOngoing, febOngoing, marOngoing, aprOngoing, mayOngoing, junOngoing, julOngoing,
                augOngoing, sepOngoing, octOngoing, novOngoing, decOngoing]
        },
    ];

    const guestOption = {
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
        }
    };
    return (
        <div>
            <ReactApexChart type="area" series={series} options={guestOption} width="100%" height="300px" />
        </div>
    );
}