import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useContext } from "react";
import { ThemeContext } from 'styled-components';

// Define a type for the pie chart data structure
interface PieChartData {
  [key: string]: string | number;
}

type PieChartXRProps = {
  data: PieChartData[];
  dataKey: string;
  nameKey: string;
};

const PieChartXR = ({ data, dataKey, nameKey }: PieChartXRProps) => {

  // Use the ThemeContext with the defined structure for 'dashboard' theme properties
  const { dashboard } = useContext(ThemeContext) as {
    dashboard: {
      reference_graphic_primary: string;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          dataKey={dataKey}
          nameKey={nameKey}
          label={(data) => `${data.payload[nameKey]} - $ ${data.payload[dataKey]}`}
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill={dashboard.reference_graphic_primary}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartXR;
