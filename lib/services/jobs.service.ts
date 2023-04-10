import Jobs, { JobsType } from "Models/Jobs";
import User from "Models/User";

export interface CreateJobProps {
  carBrand?: string;
  expires?: Date;
  to?: string;
}
export async function createJob(_id: string, job: JobsType) {
  try {
    const { title, description, location, category } = job;
    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("Description is required");
    if (!location) throw new Error("Location is required");
    if (!category) throw new Error("Category is required");

    const user = await User.findOne({ _id });
    if (!user) throw new Error("user not Logged in!");
    const createdJob = await new Jobs({
      ...job,
      user,
    });
    await createdJob.save();
    return createdJob;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
export async function getJobById(_id: string) {
  try {
    const jobs: JobsType[] = await Jobs.findById(_id)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "user",
          select: "-password",
        },
      ]);
    return jobs;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
// {title : 'electrical ', description:" blah"}
export async function getJobByField(field: any) {
  try {
    const query = {
      field,
      ...(field.description && {
        description: { $regex: field.description, $options: "i" },
      }),
    };
    const jobs: JobsType[] = await Jobs.find({ query })
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "user",
          select: "-password",
        },
      ]);
    return jobs;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

export async function editJob(jobId: string, details: JobsType) {
  try {
    const { title, description, location, category, type } = details;
    if (!title) throw new Error("Title is required");
    if (!description) throw new Error("Description is required");
    if (!location) throw new Error("Location is required");
    if (!category) throw new Error("Category is required");
    if (!type) throw new Error("Type is required");

    const createdJob = await Jobs.findByIdAndUpdate(
      {
        _id: jobId,
      },
      details,
      { new: true }
    );
    return createdJob;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
export async function applyJob(userId: string, jobId: string) {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { appliedTo: jobId } },
      { new: true }
    );
    const job = await Jobs.findByIdAndUpdate(
      { _id: jobId },
      { $push: { appliedUsers: user } },
      { new: true }
    );

    return { user, job };
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
export async function deleteJob(jobId: string) {
  try {
    const job: JobsType | null = await Jobs.findOneAndDelete({
      _id: jobId,
    });
    if (!job) throw new Error("contract not found");
    return { job };
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
