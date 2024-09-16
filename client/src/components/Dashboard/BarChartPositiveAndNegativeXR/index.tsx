import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { useContext } from "react";
import { ThemeContext } from 'styled-components';

// Define a type for the data item structure
interface ChartData {
  [key: string]: number | string;
}

type BarChartXRProps = {
  data: ChartData[];
  dataKeyXAxis: string;
  dataKeyPositive: string;
  dataKeyNegative: string;
  nameLinePositive: string;
  nameLineNegative: string;
};

const BarChartPositiveAndNegativeXR = ({
  data,
  dataKeyPositive,
  dataKeyNegative,
  nameLinePositive,
  nameLineNegative,
  dataKeyXAxis
}: BarChartXRProps) => {

  // Use the ThemeContext with a defined structure for the 'dashboard' theme properties
  const { dashboard } = useContext(ThemeContext) as {
    dashboard: {
      background_tooltip: string;
      reference_graphic_primary: string;
      reference_graphic_secondary: string;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 16 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyXAxis} />
        <YAxis />
        <Tooltip
          labelFormatter={() => ''}
          cursor={{ fill: dashboard.background_tooltip }}
          contentStyle={{ backgroundColor: dashboard.background_tooltip }}
        />
        <ReferenceLine y={0} stroke={dashboard.reference_graphic_primary} />
        <Bar dataKey={dataKeyPositive} fill={dashboard.reference_graphic_primary} name={nameLinePositive} />
        <Bar dataKey={dataKeyNegative} fill={dashboard.reference_graphic_secondary} name={nameLineNegative} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartPositiveAndNegativeXR;
