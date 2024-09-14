/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label
  } from 'recharts';
  
  const PriceHistoryChart = ({ data,onPriceUpdate }) => {
    // Calculate the highest, lowest, and average price
    const highestPrice = Math.max(...data.map(d => d.price));
    const lowestPrice = Math.min(...data.map(d => d.price));
    const averagePrice = (data.reduce((sum, d) => sum + d.price, 0) / data.length).toFixed(2);

    useEffect(() => {
      if (onPriceUpdate) {
        onPriceUpdate({ highestPrice, lowestPrice, averagePrice });
      }
    }, [highestPrice, lowestPrice, averagePrice, onPriceUpdate]);
  
  
    // Custom Y-axis tick formatter to show prices in 'K' (thousands) or regular format
    const formatYAxis = (tick) => {
      if (tick >= 1000) {
        return `${(tick / 1000).toFixed(1)}K`;
      }
      return tick;
    };
  
    return (
      <div className="w-full h-80">
        <h2 className="text-3xl font-bold mb-6">Price History</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" interval="preserveStartEnd" tick={{ fontSize: 12 }} />
            <YAxis 
              domain={[lowestPrice - 200, highestPrice + 200]} 
              tick={{ fontSize: 12 }} 
              tickFormatter={formatYAxis} 
            />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
  
            {/* Reference lines for Highest, Average, and Lowest prices */}
            <ReferenceLine 
              y={highestPrice} 
              stroke="red" 
              strokeDasharray="3 3" 
            >
              <Label 
                value={`Highest Price: ₹${highestPrice}`} 
                position="insideRight" 
                fill="red" 
                fontSize={15} 
                fontWeight="bold" 
                offset={10} 
              />
            </ReferenceLine>
  
            <ReferenceLine 
              y={averagePrice} 
              stroke="orange" 
              strokeDasharray="3 3" 
            >
              <Label 
                value={`Average Price: ₹${averagePrice}`} 
                position="insideRight" 
                fill="orange" 
                fontSize={15} 
                fontWeight="bold" 
                offset={10} 
              />
            </ReferenceLine>
  
            <ReferenceLine 
              y={lowestPrice} 
              stroke="green" 
              strokeDasharray="3 3" 
            >
              <Label 
                value={`Lowest Price: ₹${lowestPrice}`} 
                position="insideRight" 
                fill="green" 
                fontSize={15} 
                fontWeight="bold" 
                offset={10} 
              />
            </ReferenceLine>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default PriceHistoryChart;
  