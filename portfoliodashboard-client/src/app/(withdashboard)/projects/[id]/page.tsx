/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { deleteProject, getSingleProject } from '@/services/projectServices';
import { toast } from 'sonner';

const ProjectDetails = () => {
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams(); 

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!params?.id) return; 
        const res = await getSingleProject(params.id as string);
        console.log(res);
        if (res.success) {
          setProject(res?.data);
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params?.id]);

  const handleUpdate = () => {
    router.push(`/projects/updateProjects/${params.id}`);
  };

  const handleDelete = async () => {
    try {
        const res=await deleteProject(project._id);
        if(res.success){
            toast.success('Project Deleted Successfully');
            router.push('/projects');
        }
        else{
            toast.error('Not deleted')
        } 
      } catch (error) {
        console.error('Error deleting project:', error);
      }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-lg font-semibold">Loading...</div>;
  }

  if (!project) {
    return <div className="p-10 text-center text-red-500 text-lg font-semibold">Project not found</div>;
  }

  return (
    <div className="p-14 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">{project?.title}</h2>
      <p className="text-1xl text-gray-800">{project?.description}</p>
      {project?.image && (
        <img
          src={project?.image}
          alt={project?.description}
          className="w-full h-auto max-h-80 object-cover rounded"
        />
      )}
      <p className="mt-4 text-sm text-black">
        Link: <a href={project?.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{project?.link}</a>
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
