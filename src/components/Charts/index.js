import React from 'react';
import { Line, Pie } from "@ant-design/charts";

function ChartComponent({ sortedTransactions }) {
    // Prepare data for the line chart
    const data = sortedTransactions.map((item) => ({
        date: item.date,
        amount: item.amount,
    }));

 
    const spendingData = sortedTransactions
        .filter((transaction) => transaction.type === "expense")
        .map((transaction) => ({
            tag: transaction.tag,
            amount: transaction.amount,
        }));

    
    const finalSpendings = spendingData.reduce((acc, obj) => {
        let key = obj.tag.toLowerCase(); 
        if (!acc[key]) {
            acc[key] = { tag: obj.tag, amount: obj.amount };
        } else {
            acc[key].amount += obj.amount;
        }
        return acc;
    }, {});

   
    const predefinedSpendings = [
        "Groceries", "Rent", "Utilities", "Transportation", "Entertainment", "Health", "Education"
    ];

    
    const newSpendings = predefinedSpendings.map((tag) => {
        
        const categoryData = finalSpendings[tag.toLowerCase()] || { tag: tag, amount: 0 };
        return categoryData;
    });

   
    const config = {
        data: data,
        width: 500,
        autoFit: true,
        xField: "date",
        yField: "amount",
        smooth: true,
        xAxis: {
            type: "timeCat",
        },
        yAxis: {},
    };

   
    const spendingConfig = {
        data: newSpendings,
        width: 500,
        autoFit: true,
        angleField: "amount",
        colorField: "tag",
        radius: 0.8, 
    };

    return (
        <div className="charts-wrapper">
            <div>
                <h2>Your Analytics</h2>
                <Line
                    {...config}
                />
            </div>
            <div>
                <h2>Your Spendings</h2>
                <Pie
                    {...spendingConfig}
                />
            </div>
        </div>
    );
}

export default ChartComponent;
/*
import React from 'react';
import {Line, Pie} from "@ant-design/charts";

function ChartComponent({sortedTransactions}) {
    const data = sortedTransactions.map((item)=>{
        return {date: item.date, amount: item.amount};
    });
  
  const spendingData = sortedTransactions.filter((transaction)=>{
    if(transaction.type === "expense"){
       return { tag: transaction.tag, amount: transaction.amount};
    }
});

let finalSpendings = spendingData.reduce((acc,obj)=> {
    let key = obj.tag;
    if (!acc[key]){
      acc[key] = {tag: obj.tag, amount: obj.amount};
    }else{
      acc[key].amount += obj.amount;
    }
    return acc;
},{});

let newSpendings = [
  { tag: "Groceries" , amount: 0},
  { tag: "Rent" , amount: 0},
  { tag: "Utilities" , amount: 0},
  { tag: "Transportation" , amount: 0},
  { tag: "Entertainment" , amount: 0},
  { tag: "Health" , amount: 0},
  { tag: "Education" , amount: 0},

]

  const config = {
    data: data,
    width: 500,
    autoFit: true,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
   data: newSpendings,
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
*/