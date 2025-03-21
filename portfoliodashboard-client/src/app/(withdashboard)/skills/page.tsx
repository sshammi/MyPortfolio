/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllSkills } from "@/services/skillServices"; // Service to fetch skills
import { deleteSkill } from "@/services/skillServices"; // Service to delete a skill

const SkillsDashboard = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getAllSkills();
        console.log(res);
        if (res?.success) {
          setSkills(res.data);
        } else {
          console.log(res.message);
          setIsError(true);
        }
      } catch (error) {
        console.log("Error fetching skills:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await deleteSkill(id);
      if (res?.success) {
        setSkills(skills.filter(skill => skill._id !== id));
      } else {
        console.log(res.message);
        setIsError(true);
      }
    } catch (error) {
      console.log("Error deleting skill:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-14 sm:p-14 md:p-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Skills</h1>
        <Link href="/skills/addSkill">
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500">
            Add Skill
          </button>
        </Link>
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to fetch skills.</p>}

      {skills.length === 0 && !isLoading && !isError ? (
        <p className="text-center text-gray-500">No skills available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill: any) => (
            <div key={skill._id} className="p-6 border rounded-lg shadow bg-slate-200">
              <h2 className="text-xl font-bold mt-2">{skill.skillName}</h2>

              <div className="mt-4 flex space-x-4 justify-between">
                <Link href={`/skills/updateSkill/${skill._id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                    Update
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(skill._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsDashboard;
