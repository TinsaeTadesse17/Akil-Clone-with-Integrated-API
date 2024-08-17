"use client";
import Card from "./components/card";
import Link from "next/link";
import Image from "next/image";
import Type from "./type";
import { useGetAllOpportunitiesQuery } from "../service/apiSlice";
import { useState } from "react";
import errors from "../public/error.png";
import loading from "../public/loading.png";

export default function Home() {
  let { data, isError, isLoading } = useGetAllOpportunitiesQuery(undefined);
  const job: Type[] = data?.data;

  const [sortMethod, setSortMethod] = useState("Most Relevant");

  // Sorting function
  const sortedJobs = [...(job || [])].sort((a, b) => {
    if (sortMethod === "Newest First") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(e.target.value);
  };

  if (isError) {
    return <Image className="bg-center" src={errors} alt="Error" />;
  }
  if (isLoading) {
    return <Image className="bg-center" src={loading} alt="Loading" />;
  }

  return (
    <main className="bg-white h-fit flex mb-4 justify-center">
      <div className="w-full max-w-5xl mt-16 bg-white px-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="title-1 font-bold">Opportunities</h1>
            <h5 className="body-text ml-1">
              showing {sortedJobs.length} results
            </h5>
          </div>
          <div className="body-text">
            <h5>
              Sort by:{" "}
              <span className="font-bold text-gray-600">
                <select name="method" id="method" onChange={handleSortChange}>
                  <option value="Most Relevant">Most Relevant</option>
                  <option value="Newest First">Newest First</option>
                </select>
              </span>
            </h5>
          </div>
        </div>

        <ul className="space-y-13 mt-9 w-full">
          {sortedJobs.map((item: Type, index: number) => (
            <Link key={index} href={`/Description/${item.id}`}>
              <Card
                title={item.title}
                opType={item.opType}
                description={item.description}
                location={item.location}
                company={item.orgName}
                image={item.logoUrl}
                categories={item.categories}
              />
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
}
