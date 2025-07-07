"use client";

import formatDate from "@/utility/commonFunction";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type DataPoint = {
  date: string;
  amount: number;
};

interface AmountDateChartProps {
  data: DataPoint[];
}

export default function AmountDateChart({ data }: AmountDateChartProps) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="transactionDate" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="traAmount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
