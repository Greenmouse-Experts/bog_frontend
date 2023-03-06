import React from "react";
import ReactApexChart from "react-apexcharts";

  
export default function ProjectChart({ data }) {
  
  let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;

  if (data.length > 0) {
    data.forEach((item) => {
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
          name: "Project",
          data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
        }
      ];
    
    const guestOption = {
        stroke: {
            curve: "smooth",
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
          }
      };
      return (
        <div>
          <ReactApexChart type="area" series={series} options={guestOption} width="100%" />
        </div>
      );
}

export function AdminChart({ clientData }) {
  
  console.log(clientData)

  const series = [{
    name: 'Clients',
    data: [31, 40, 28, 51, 42, 55, 40, 34, 20, 10]
  }, {
    name: 'Service Partners',
    data: [11, 32, 45, 32, 34, 52, 71, 24, 75, 76]
  }, {
    name: 'Product Partners',
    data: [4, 8, 21, 8, 34, 32, 41, 37, 40, 50]
  }];
  const options = {
    chart: {
      height: 250,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    },
    
  };

  return(
    <div>
      <ReactApexChart type="area" series={series} options={options} width="100%" />
  </div>
  )
}