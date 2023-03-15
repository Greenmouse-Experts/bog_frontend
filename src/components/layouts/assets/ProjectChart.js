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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    }
  };
  return (
    <div>
      <ReactApexChart type="area" series={series} options={guestOption} width="100%" />
    </div>
  );
}

export function AdminChart({ clientData, serviceData, productPartnerData }) {

  let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;

  let janService = 0, febService = 0, marService = 0, aprService = 0, mayService = 0, junService = 0, julService = 0,
    augService = 0, sepService = 0, octService = 0, novService = 0, decService = 0;

  let janPartner = 0, febPartner = 0, marPartner = 0, aprPartner = 0, mayPartner = 0, junPartner = 0, julPartner = 0,
    augPartner = 0, sepPartner = 0, octPartner = 0, novPartner = 0, decPartner = 0;


  if (clientData.length > 0) {
    clientData.forEach((item) => {
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


  if (productPartnerData.length > 0) {
    productPartnerData.forEach((item) => {
      if ((new Date(item.createdAt).getMonth() + 1) === 1) {
        janPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
        febPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
        marPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
        aprPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
        mayPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
        junPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
        julPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
        augPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
        sepPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
        octPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
        novPartner += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
        decPartner += 1
      }
    })
  }


  if (serviceData.length > 0) {
    serviceData.forEach((item) => {
      if ((new Date(item.createdAt).getMonth() + 1) === 1) {
        janService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 2) {
        febService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 3) {
        marService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 4) {
        aprService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 5) {
        mayService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 6) {
        junService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 7) {
        julService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 8) {
        augService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 9) {
        sepService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 10) {
        octService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 11) {
        novService += 1
      }
      else if ((new Date(item.createdAt).getMonth() + 1) === 12) {
        decService += 1
      }
    })
  }

  const series = [{
    name: 'Clients',
    data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
  }, {
    name: 'Service Partners',
    data: [janService, febService, marService, aprService, mayService, junService, julService, augService, sepService,
      octService, novService, decService]
  }, {
    name: 'Product Partners',
    data: [janPartner, febPartner, marPartner, aprPartner, mayPartner, junPartner, julPartner, augPartner, sepPartner,
      octPartner, novPartner, decPartner]
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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },

  };

  return (
    <div>
      <ReactApexChart type="area" series={series} options={options} width="100%" />
    </div>
  )
}