import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import dayjs from 'dayjs';
import { AppDispatch, RootState } from '@/redux/store';
import { AdminListJob } from '@/redux/actions/adminAction';

const valueFormatter = (value: number | null) => `${value}(nos)`;

const chartSetting = {
    yAxis: [
        {
            label: 'progress (nos)',
        },
    ],
    series: [{ dataKey: 'count', label: 'Requests', valueFormatter }],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};

interface IPage {
    page: string;
}

const groupByTimeUnit = (job: any[], unit: string) => {
    const groupedData: Record<string, number> = {};

    job?.forEach((job) => {
        const date = dayjs(job.createdAt);
        const key = date.format(unit);

        if (!groupedData[key]) {
            groupedData[key] = 0;
        }
        groupedData[key]++;
    });

    return Object.keys(groupedData).map((key) => ({
        time: key,
        count: groupedData[key],
    }));
};

const getDatasetForPage = (job: any[], page: string) => {
    switch (page) {
        case 'week':
            return groupByTimeUnit(job, 'dddd');
        case 'month':
            return groupByTimeUnit(job, 'MMM');
        case 'year':
            return groupByTimeUnit(job, 'YYYY');
        default:
            return [];
    }
};

export const JobLineChart = ({ page }: IPage) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: job }: any = useSelector((state: RootState) => state.job);

    useEffect(() => {
        dispatch(AdminListJob())
    }, [dispatch]);

    const dataset = useMemo(() => getDatasetForPage(job, page), [job, page]);

    const xAxisLabel = useMemo(() => {
        switch (page) {
            case 'week':
                return 'Day';
            case 'month':
                return 'Month';
            case 'year':
                return 'Year';
            default:
                return 'Time';
        }
    }, [page]);

    return (
        <div style={{ width: '100%' }}>
            <BarChart
                dataset={dataset}
                xAxis={[
                    { scaleType: 'band', dataKey: 'time', label: xAxisLabel, tickPlacement: 'middle', tickLabelPlacement: 'middle' },
                ]}
                {...chartSetting}
            />
        </div>
    );
}
