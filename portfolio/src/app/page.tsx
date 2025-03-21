/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code, Database,Server } from 'lucide-react';
import { SiHtml5, SiCss3, SiJavascript } from 'react-icons/si';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';
import { getAllSkills } from '@/services/skillServices';
import ProjectSection from '@/common/projectSection';
import BlogSection from '@/common/blog';

const Home = () => {
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

  const skills = [
    { name: 'React', icon: <Code size={50} className="text-blue-500" /> },
    { name: 'Node.js', icon: <Server size={50} className="text-green-500" /> },
    { name: 'Database', icon: <Database size={50} className="text-red-500" /> },
    { name: 'HTML5', icon: <SiHtml5 size={50} className="text-orange-500" /> },
    { name: 'CSS3', icon: <SiCss3 size={50} className="text-blue-400" /> },
    { name: 'JavaScript', icon: <SiJavascript size={50} className="text-yellow-500" /> },
  ];

  return (
    <div className=" text-gray-600 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center flex flex-col items-center">
      <CldImage
    src="Arketemo_3_snkdiu"
    alt="Shammi's Photo"
    width={200}
    height={200}
    className="h-48 w-48 object-cover rounded-full mb-4"
  />
  <h1 className="text-4xl font-bold mt-4">Suraiya Shammi</h1>
  <h2 className="text-lg text-gray-600">Full Stack Developer</h2>
  
  <p className="text-lg text-gray-600 max-w-2xl mt-4">
    I’m a <span className="font-bold text-gray-700">Full-Stack Web Developer</span> with a strong 
    <span className="text-gray-700 font-bold"> problem-solving mindset</span>, passionate about building 
    efficient and scalable solutions. Let’s build something amazing together!
  </p>
      </section>
  {/*Education */}
  <section className="container mx-auto px-6 py-10">
  <h2 className="text-3xl font-bold text-center mb-6">Education</h2>

  <div className="relative flex flex-col md:flex-row items-center justify-center gap-12">
    {/* Side Line (Visible only on larger screens) */}
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800"></div>

    {/* University */}
    <div className="relative text-gray-600 p-6 rounded-lg w-full sm:w-2/3 md:w-1/3 text-center">
      <h3 className="text-2xl font-semibold text-gray-700">University</h3>
      <p className="mt-2 py-5">
        I am a <span className="font-semibold">final-year</span> student in the 
        <span className="text-gray-700 font-semibold"> Computer Science and Engineering </span> 
        department at <span className="font-semibold">Mawlana Bhashani Science and Technology University</span>.
      </p>
    </div>

    {/* HSC */}
    <div className="relative text-gray-600 p-6 rounded-lg w-full sm:w-2/3 md:w-1/3 text-center ">
      <h3 className="text-2xl font-semibold text-gray-700">Higher Secondary</h3>
      <p className="mt-2 py-5">
        I completed my <span className="font-semibold">Higher Secondary Certificate (HSC)</span> 
        from <span className="text-gray-700 font-semibold">SAGC</span>.
      </p>
    </div>
  </div>
</section>


     {/* Skills Section */}
     <section className="container mx-auto px-25 py-10">
  <h2 className="text-3xl font-bold text-center mb-6">Skills</h2>

  {isLoading ? (
    <p className="text-center text-gray-600">Loading skills...</p>
  ) : isError ? (
    <p className="text-center text-red-500">Failed to load skills.</p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* Static Skills */}
      {skills.map((skill, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          {React.cloneElement(skill.icon, { size: 40 })}
          <p className="mt-2 font-semibold">{skill.name}</p>
        </div>
      ))}

      {/* Fetched Skills */}
      {Skills.slice(0, 6).map((skill, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <span className="text-4xl">⚡</span> {/* Placeholder icon */}
          <p className="mt-2 font-semibold">{skill.skillName}</p>
        </div>
      ))}
    </div>
  )}
</section>



      {/* Projects Section */}
      <ProjectSection/>

      <BlogSection/>
      {/* Resume Section */}
    </div>
  );
};

export default Home;
