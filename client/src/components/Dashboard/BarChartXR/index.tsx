import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useContext } from "react";
import { ThemeContext } from 'styled-components';

// Define a type for the chart data structure
interface ChartData {
  [key: string]: number | string;
}

type BarChartXRProps = {
  data: ChartData[];
  dataKeyXAxis: string;
  dataKeyLine: string;
  nameLine: string;
};

const BarChartXR = ({
  data,
  dataKeyLine,
  nameLine,
  dataKeyXAxis
}: BarChartXRProps) => {

  // Use the ThemeContext with the defined structure for 'dashboard' theme properties
  const { dashboard } = useContext(ThemeContext) as {
    dashboard: {
      background_tooltip: string;
      reference_graphic_primary: string;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 16 }}>
        <XAxis dataKey={dataKeyXAxis} />
        <YAxis />
        <Tooltip
          labelFormatter={() => ''}
          cursor={{ fill: dashboard.background_tooltip }}
          contentStyle={{ backgroundColor: dashboard.background_tooltip }}
        />
        <Bar dataKey={dataKeyLine} fill={dashboard.reference_graphic_primary} name={nameLine} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartXR;
