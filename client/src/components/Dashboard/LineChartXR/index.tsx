import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useContext } from "react";
import { ThemeContext } from 'styled-components';

// Define a type for the chart data structure
interface ChartData {
  [key: string]: number | string;
}

type LineChartXRProps = {
  data: ChartData[];
  dataKeyLine: string;
  nameLine: string;
  dataKeyXAxis: string;
};

const LineChartXR = ({
  data,
  dataKeyLine,
  nameLine,
  dataKeyXAxis
}: LineChartXRProps) => {

  // Use the ThemeContext with the defined structure for 'dashboard' theme properties
  const { dashboard } = useContext(ThemeContext) as {
    dashboard: {
      reference_graphic_primary: string;
      cartesian_stroke: string;
      background_tooltip: string;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 16 }}>
        <Line
          type="monotone"
          dataKey={dataKeyLine}
          stroke={dashboard.reference_graphic_primary}
          name={nameLine}
        />
        <CartesianGrid
          stroke={dashboard.cartesian_stroke}
          strokeDasharray="5 5"
        />
        <XAxis dataKey={dataKeyXAxis} />
        <YAxis />
        <Tooltip
          labelFormatter={() => ''}
          contentStyle={{ backgroundColor: dashboard.background_tooltip }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartXR;
