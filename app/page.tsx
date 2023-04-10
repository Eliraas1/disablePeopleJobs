"use client";
import { UserType } from "Models/User";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { JobsType, selectUser, selectUserToken } from "store/slices/userSlice";
import { useAppSelector } from "store/hooks";
import Link from "next/link";
import { Tabs } from "flowbite-react";
import JobList from "./Components/JobList";
import { GetRequest, postRequest } from "pages/api/hello";
import useSWRMutation from "swr/mutation";
interface props {
  users: UserType;
}
interface FormErrors {
  email?: string;
  password?: string;
}
function Home() {
  const router = useRouter();
  const token = useAppSelector(selectUserToken);
  const [allJobs, setAllJobs] = useState<JobsType[]>([]);
  if (!token) redirect("/login");
  const user = useAppSelector(selectUser);
  const {
    trigger: getAllJobs,
    data,
    error,
    isMutating,
  } = useSWRMutation("/api/jobs/getAll", GetRequest);
  const handleGetAllJobs = async () => {
    // @ts-ignore
    const a = await getAllJobs();
    const response = await a?.json();
    const jobs = response.data.jobs;
    setAllJobs(jobs);
  };
  useEffect(() => {
    handleGetAllJobs();
  }, []);
  useEffect(() => {
    token ? router.push("/") : router.push("/login");
  }, [token]);
  return (
    <div className="w-full  flex justify-center">
      <div className="h-[32rem] w-[93vw]  max-w-6xl mx-2    py-10  ">
        <div className="">
          <div className="backdrop-blur max-h-[85vh] bg-gray-300/60 rounded-lg">
            <Tabs.Group
              className="self-center link:text-black"
              aria-label="Tabs with underline"
              style="underline"
            >
              <Tabs.Item title="Applied Jobs">
                <div className=" max-w-7xl max-h-[74vh] overflow-x-auto overflow-y-auto animate__animated animate__fadeInLeft">
                  {/* <h1 className="  text-center my-5 text-3xl">My Contracts</h1> */}
                  {user.appliedTo ? (
                    <JobList jobs={user.appliedTo} />
                  ) : (
                    <div className="flex-col align-center justify-center text-center">
                      <h1 className="">No jobs yet...</h1>
                      <Link
                        href="/create-contract"
                        className="text-center inline-flex justify-center my-2  rounded-md border border-transparent  hover:bg-blue-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline flex-row bg-slate-600 items-center"
                      >
                        Create One Now!
                      </Link>
                    </div>
                  )}
                </div>
              </Tabs.Item>
              <Tabs.Item title="My Jobs">
                <div className=" max-w-7xl max-h-[74vh] overflow-x-auto overflow-y-auto animate__animated animate__fadeInLeft">
                  {user.jobs ? (
                    <JobList jobs={user.jobs} />
                  ) : (
                    <div className="flex-col align-center justify-center text-center">
                      <h1 className="">No jobs yet...</h1>
                      <Link
                        href="/create-contract"
                        className="text-center inline-flex justify-center my-2  rounded-md border border-transparent  hover:bg-blue-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline flex-row bg-slate-600 items-center"
                      >
                        Create One Now!
                      </Link>
                    </div>
                  )}
                </div>
              </Tabs.Item>
              <Tabs.Item title="All jobs" className="link:text-black">
                <div className=" max-w-7xl max-h-[74vh] overflow-x-auto overflow-y-auto animate__animated animate__fadeInRight">
                  {/* <h1 className="  text-center my-5 text-3xl">My Contracts</h1> */}
                  {allJobs ? (
                    <JobList jobs={allJobs} />
                  ) : (
                    <h1>No contracts yet...</h1>
                  )}
                </div>
              </Tabs.Item>
            </Tabs.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
