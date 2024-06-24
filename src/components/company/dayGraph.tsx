
import { BarChart } from '@mui/x-charts/BarChart';

export const ChartsOverviewDay=()=> {
  return (
    <BarChart
      series={[
        { data: [35, 44, 24, 34,51, 6, 49,],color:'violet' },
        { data: [51, 6, 49, 30,20,10,20],color:"cyan" },
      ]}
      height={290}
      xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu','Fri','Sat','Sun'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
