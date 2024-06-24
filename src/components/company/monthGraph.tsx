
import { BarChart } from '@mui/x-charts/BarChart';

export const ChartsOverviewMonth = () => {
    return (
        <BarChart
            series={[
                { data: [35, 44, 24, 34, 51, 6, 49, 24, 34, 51, 6, 49], color: 'violet' },
                { data: [51, 6, 49, 30, 20, 10, 20, 24, 34, 51, 6, 49], color: "cyan" },
            ]}
            height={290}
            xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
    );
}
