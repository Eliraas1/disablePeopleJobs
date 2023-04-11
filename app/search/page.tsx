"use client";
import JobList from "app/Components/JobList";
import { jobCategories } from "../../constants";
import { getRequest, postRequest } from "pages/api/hello";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";

const Search = () => {
  //TODO: change to refs
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Full-time");
  //TODO: set all jobs in redux and display them here at first
  const {
    trigger: search,
    data,
    error,
    isMutating,
  } = useSWRMutation("/api/jobs/getByField", getRequest);

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };
  const handlePositionChange = (event: any) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const body = {
      category,
      location,
      title,
      description,
    };
    //TODO: use swr and set jobs that return from api
    const _data = await search(body as any);
    const results = await _data?.json();
    console.log({ results });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Search Jobs</h1>
      <form className="flex justify-center items-center">
        <select
          name="category"
          value={category}
          onChange={handleCategoryChange}
          className="mr-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          required
        >
          {jobCategories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Location"
          className="mr-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          value={location}
          onChange={handleLocationChange}
        />
        <input
          type="text"
          placeholder="Title"
          className="mr-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Description"
          className="mr-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          value={description}
          onChange={handleDescriptionChange}
        />
        <select
          name="type"
          value={type}
          onChange={handlePositionChange}
          className="mr-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
          required
        >
          <option value="Part time">Full-time</option>
          <option value="Part time">Part-time</option>
          <option value="Student">Student position</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
      {/* Render JobList component with search parameters */}
      <JobList jobs={[]} />
    </div>
  );
};

export default Search;
