import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import dayjs from 'dayjs';
import {  companyList } from '@/redux/actions/companyAction';
import { AppDispatch, RootState } from '@/redux/store';

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

const groupByTimeUnit = (requests: any[], unit: string) => {
  const groupedData: Record<string, number> = {};

  requests?.forEach((request) => {
    const date = dayjs(request.createdAt);
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

const getDatasetForPage = (requests: any[], page: string) => {
  switch (page) {
    case 'week':
      return groupByTimeUnit(requests, 'dddd');
    case 'month':
      return groupByTimeUnit(requests, 'MMM'); 
    case 'year':
      return groupByTimeUnit(requests, 'YYYY'); 
    default:
      return [];
  }
};

export default function CLineChart({ page }: IPage) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: requests }: any = useSelector((state: RootState) => state.companyList);

  useEffect(() => {
     dispatch(companyList());
  }, [dispatch]);

  const dataset = useMemo(() => getDatasetForPage(requests, page), [requests, page]);

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
