import dbConnect from "@/lib/dbConnect";
import Jobs from "Models/Jobs";
import React from "react";

const people = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Bob Johnson", email: "bob.johnson@example.com" },
  // Add more people here...
];
type Props = {
  params: { id: string };
};

const getPeopleByJobId = async (jid: string) => {
  await dbConnect();
  const jobs = await Jobs.find({ _id: jid });
  return jobs;
};
const d = (e: any) => {
  console.log({ e });
};
const PeopleList: React.FC<Props> = ({ params: { id } }) => {
  getPeopleByJobId(id).then(d).catch(d);

  return (
    <ul className="space-y-4">
      {people.map((person, index) => (
        <li
          key={index}
          className="flex items-center bg-gray-100 p-4 rounded shadow "
        >
          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4">
            {person.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold">{person.name}</h3>
            <p className="text-gray-600">{person.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PeopleList;
