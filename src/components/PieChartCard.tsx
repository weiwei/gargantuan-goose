import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export interface Props {
  data: { name: string; value: number }[];
}

export default function DashPieChart(props: Props) {
  const { data } = props;
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Pie Chart</CardTitle>
      </CardHeader>
      <CardContent className="">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </CardContent>
    </Card>
  );
}
