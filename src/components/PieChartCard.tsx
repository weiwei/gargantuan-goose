import { PieChart, Pie, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const COLORS = { Windows: "#0088FE", Mac: "#00C49F", Linux: "#FFBB28" };

export interface Props {
  name: string;
  data: { name: "Windows" | "Mac" | "Linux"; value: number }[];
}

export default function DashPieChart(props: Props) {
  const { name, data } = props;
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
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
                fill={COLORS[entry.name]}
              />
            ))}
          </Pie>
        </PieChart>
      </CardContent>
    </Card>
  );
}
