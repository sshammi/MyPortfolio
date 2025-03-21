/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getAllSkills } from '@/services/skillServices';
import React, { useEffect, useState } from 'react'

const Skills = () => {
      const [Skills, setSkills] = useState<any[]>([]);
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
  return (
    <div className='min-h-screen'>
      <section className="container mx-auto px-25 py-10">
        <h2 className="text-3xl font-bold text-center mb-6">All Skills</h2>
      
        {isLoading ? (
          <p className="text-center text-gray-600">Loading skills...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load skills.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Fetched Skills */}
            {Skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                <span className="text-4xl">⚡</span> {/* Placeholder icon */}
                <p className="mt-2 font-semibold">{skill.skillName}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Skills
