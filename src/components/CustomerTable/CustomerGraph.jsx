import { useEffect, useState } from "react";
import Chart from 'chart.js/auto'


export default function CustomerGraph(selectedTransaction ) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (selectedTransaction) {
            let cdata = selectedTransaction.data 
            let SelectedTr = selectedTransaction.slectedTransaction

            let filteredElements = cdata.filter((item) => item.customer_id === SelectedTr)
            setChartData(filteredElements)
        }
      }, [selectedTransaction]);
   useEffect(() => {
        new Chart(
            document.getElementById('acquisition'),
            {
              type: 'bar',
              data: {
                labels: chartData.map(row => row.date),
                datasets: [
                  {
                    label: "customer graph ",
                    data: chartData.map(row => row.amount)
                  }
                ]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  
                }
            }
          }
          );
          return()=>{
            Chart.getChart("acquisition").destroy()
          }
    }, [chartData]);


    return (
        <div className="container font-monospace">
            <canvas className="w-100 display-6"   id="acquisition"></canvas>
        </div>
    );
}
