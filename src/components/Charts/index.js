import React from 'react';
import {Line, Pie} from "@ant-design/charts";

function ChartComponent({sortedTransactions}) {
    const data = sortedTransactions.map((item)=>{
        return {date: item.date, amount: item.amount};
    });
  
  const spendingData = sortedTransactions.filter((transaction)=>{
    if(transaction.type == "expense"){
       return { tag: transaction.tag, amount: transaction.amount};
    }
});

  const config = {
    data:data,
    width: 500,
    autoFit: true,
    xField: "date",
    yFeild: "amount",
  };

  const spendingConfig = {
   data: spendingData,
    width: 500,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let pieChart;
  return (
    <div className='charts-wrapper'>
        <div>
            <h2>Your Analytics</h2>
        <Line
        {...config}
        onReady={(chartInstance) => {
          chart = chartInstance;
        }}
      />
      </div>
      <div>
        <h2>Your Spendings</h2>
        <Pie
        {...spendingConfig}
        onReady={(chartInstance) => {
          pieChart = chartInstance;
        }}
        />
          
      </div>
    </div>
  );
}

export default ChartComponent;
