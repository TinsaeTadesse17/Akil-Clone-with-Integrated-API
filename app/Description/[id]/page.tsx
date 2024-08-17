"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useGetSingleOpportunityQuery } from "../../../service/apiSlice";
import Image from "next/image";
import icon2 from "../../../public/3.svg";
import icon3 from "../../../public/4.svg";
import icon4 from "../../../public/fire.svg";
import icon5 from "../../../public/5.svg";
import icon6 from "../../../public/6.svg";
import icon from "../../../public/tick.svg";
import errors from "../../../public/error.png";
import loading from "../../../public/loading.png";

const Page = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleOpportunityQuery(id as string);
  console.log(id);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image className="bg-center" src={errors} alt="Error" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image className="bg-center" src={loading} alt="Loading" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image className="bg-center" src={errors} alt="error" />
      </div>
    );
  }

  const aJob = data?.data;

  const Date_format = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white flex flex-col lg:flex-row h-full py-8 pl-8 pr-7 justify-between">
        <div className="bg-white w-full lg:w-3/4 space-y-11">
          <h1 className="font-poppins font-black text-2xl text-[rgba(37, 50, 75, 1)]">
            Description
          </h1>
          <p className="font-normal font-Epilogue text-[rgba(37,50,75,1)]">
            {aJob?.description}
          </p>
          <h1 className="font-poppins font-black text-2xl text-[rgba(37, 50, 75, 1)]">
            Responsibilities
          </h1>
          <ul className="space-y-2">
            {aJob?.responsibilities
              ?.split(".")
              .map((part: string, index: number) =>
                part !== "" ? (
                  <li
                    key={index}
                    className="font-normal font-Epilogue text-[rgba(37,50,75,1)] flex"
                  >
                    <Image className="mr-3" src={icon} alt="Tick Icon" />
                    {part}
                  </li>
                ) : null
              )}
          </ul>
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)]">
            Ideal Candidate we want
          </h1>
          <p className="font-normal font-Epilogue text-[rgba(37,50,75,1)]">
            {aJob?.idealCandidate}
          </p>
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)] pt-14">
            When & Where
          </h1>
          <div className="flex pt-5">
            <Image className="mr-3" src={icon3} alt="Location Icon" />
            <p className="font-normal font-Epilogue text-[rgba(37,50,75,1)] p-2">
              {aJob?.whenAndWhere}
            </p>
          </div>
        </div>
        <div className="space-y-5 w-full lg:w-1/4">
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)] pl-2">
            About
          </h1>
          <div className="flex">
            <Image className="mr-3" src={icon2} alt="Plus Icon" />
            <div>
              <p className="font-normal font-Epilogue text-[rgba(81,91,111,1)]">
                Posted On
              </p>
              <p className="font-semibold">
                {Date_format(aJob?.datePosted ?? "")}
              </p>
            </div>
          </div>
          <div className="flex">
            <Image className="mr-3" src={icon4} alt="Deadline Icon" />
            <div>
              <p className="font-light"> Deadline</p>
              <p className="font-semibold">
                {Date_format(aJob?.deadline ?? "")}
              </p>
            </div>
          </div>
          <div className="flex">
            <Image className="mr-3" src={icon3} alt="Location Icon" />
            <div>
              <p className="font-light "> Location</p>
              <p className="font-semibold">{aJob?.location}</p>
            </div>
          </div>
          <div className="flex">
            <Image className="mr-3" src={icon5} alt="Start Icon" />
            <div>
              <p className="font-light"> Start Date</p>
              <p className="font-semibold">
                {Date_format(aJob?.startDate ?? "")}{" "}
              </p>
            </div>
          </div>
          <div className="flex">
            <Image className="mr-3" src={icon6} alt="End Icon" />
            <p className="font-light"> End Date</p>
            <p className="font-semibold">{Date_format(aJob?.endDate ?? "")}</p>
          </div>
          <hr />
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)]">
            Categories
          </h1>
          {aJob?.categories?.map((cat: string, index: number) => (
            <p
              key={index}
              className={`inline-block font-Epilogue font-semibold py-1 px-3 w-fit rounded-full m-2 bg-center ${
                index % 2 === 0
                  ? "bg-[rgba(235,133,51,0.1)] text-[rgba(255,184,54,1)]"
                  : "bg-[rgba(86,205,173,0.1)] text-[rgba(86,205,173,1)]"
              }`}
            >
              {cat}
            </p>
          ))}
          <hr />
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)]">
            Required Skills
          </h1>
          {aJob?.requiredSkills?.map((skill: string, index: number) => (
            <p
              key={index}
              className="bg-[rgba(248,248,253,1)] text-[#4540def5] font-normal py-1 px-3 w-fit m-2 inline-block"
            >
              {skill}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
