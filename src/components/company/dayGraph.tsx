import { companyApplicantList } from '@/redux/actions/companyAction';
import { fecthJob } from '@/redux/actions/jobAction';
import { AppDispatch, RootState } from '@/redux/store';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

export const ChartsOverviewDay = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.company);
  const { data: jobs } = useSelector((state: RootState) => state.job);
  const { data: applicants } = useSelector((state: RootState) => state.applicantList);

  const [weekData, setWeekData] = useState<any[]>([]); 

  useEffect(() => {
    const update = async () => {
      await dispatch(fecthJob(data?._id));
      await dispatch(companyApplicantList(String(data?._id)));
    };
    update();
  }, []);

  useEffect(() => {
   
    const filterDataByWeek = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); 
      const startDate = new Date(currentDate); 
      startDate.setDate(startDate.getDate() - currentDay); 
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate); 
      endDate.setDate(endDate.getDate() + 6); 
      endDate.setHours(23, 59, 59, 999);

    
      const filteredJobs = jobs?.filter((job: any) => {
        const jobDate = new Date(job.createdAt); 
        return jobDate >= startDate && jobDate <= endDate;
      });

      const filteredApplicants = applicants?.filter((applicant: any) => {
        const applicantDate = new Date(applicant.createdAt); 
        return applicantDate >= startDate && applicantDate <= endDate;
      });

  
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayData: any[] = daysOfWeek.map(() => ({ jobCount: 0, applicantCount: 0 }));

      
      filteredJobs?.forEach((job: any) => {
        const jobDay = new Date(job.createdAt).getDay(); 
        dayData[jobDay].jobCount++;
      });

      filteredApplicants?.forEach((applicant: any) => {
        const applicantDay = new Date(applicant.createdAt).getDay(); 
        dayData[applicantDay].applicantCount++;
      });

     
      const formattedData = daysOfWeek.map((_, index) => ({
        data: [dayData[index].jobCount, dayData[index].applicantCount],
        color: index % 2 === 0 ? 'violet' : 'cyan', 
      }));

      setWeekData(formattedData);
    };

    filterDataByWeek(); 
  }, [jobs, applicants]);

  return (
    <BarChart
      series={weekData} 
      height={290}
      xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};
