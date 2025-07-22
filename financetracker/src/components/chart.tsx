"use client";

import formatDate from "@/utility/commonFunction";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type DataPoint = {
  transactionDate: string; // make sure your data uses this key
  traAmount: number;       // same here
};

interface AmountDateChartProps {
  data: DataPoint[];
}

export default function AmountDateChart({ data }: AmountDateChartProps) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="transactionDate" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="traAmount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
