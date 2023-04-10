import React from "react";
import JobCard from "./JobCard";
import { JobsType, apply } from "store/slices/userSlice";
import { postRequest } from "pages/api/hello";
import useSWRMutation from "swr/mutation";
import { useAppDispatch } from "store/hooks";

interface JobListProps {
  jobs: JobsType[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const dispatch = useAppDispatch();
  const {
    trigger: applyToJob,
    data,
    error,
    isMutating,
  } = useSWRMutation("/api/jobs/apply", postRequest);
  const onApply = async (jobId?: string) => {
    //TODO: dispatch to apply/edit with jobid
    const returnData = await applyToJob({ jobId });
    const _data = await returnData?.json();
    const res = _data?.data;
    const newJob = res.job;
    console.log("jobId", newJob);
    dispatch(apply(newJob));
    // console.log({ jobId });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs?.map((job, index) => (
        <JobCard key={job.title + index} job={job} onApply={onApply} />
      ))}
    </div>
  );
};

export default JobList;
