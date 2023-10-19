import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Data, allRouteOptions } from './modals/project-section-modal';
import Button from '@ui/Button';
import { Add } from 'iconsax-react';
import axios from 'axios';
import { notify } from '@ui/Toast';

const endpoint = 'https://hng6-r5y3.onrender.com';
const AllProjectsModal = ({
  onEdit,
  projects,
  handleSetRoute,
  handleLoading,
  handleSetProjects,
  onCloseModal,
  userId,
}: {
  projects: any[];
  onEdit: (data: Data) => void;
  onCloseModal: () => void;
  handleSetRoute: (data: allRouteOptions) => void;
  handleSetProjects: (data: any[]) => void;
  handleLoading: (data: boolean) => void;
  userId: string | undefined;
}) => {
  const handleEdit = (data: Data) => {
    onEdit(data);
  };

  const handleAddNewProject = () => {
    handleSetRoute('add-project');
    onEdit({
      description: '',
      tags: '',
      url: '',
      title: '',
      thumbnail: '',
      id: null,
      year: '',
      link: '',
      media: [],
      projectsImages: [],
    });
  };

  const getAllProjects = () => {
    handleLoading(true);
    axios
      .get(`${endpoint}/api/users/${userId}/projects`)
      .then((res) => {
        handleLoading(false);
        handleSetProjects(res.data.data);
      })
      .catch((err) => {
        handleLoading(false);
        console.log(err);
      });
  };

  const handleDelete = (id: number | null) => {
    axios
      .delete(`${endpoint}/api/projects/${id}`)
      .then((res) => {
        console.log(res.data);
        notify({
          message: 'Project deleted successfully',
          position: 'top-center',
          theme: 'light',
          type: 'success',
        });
        getAllProjects();
      })
      .catch((err) => {
        console.log(err);
        notify({
          message: 'Error occurred',
          position: 'top-center',
          theme: 'light',
          type: 'error',
        });
      });
  };

  return (
    <section className="p-5">
      <section className="h-[350px] w-full overflow-y-auto">
        {projects.length > 0 &&
          projects.map((project: Data) => {
            const { description, tags, url, title, thumbnail, id } = project;
            return (
              <>
                <section className="flex flex-wrap gap-10 mt-10">
                  <section className="w-full min-[920px]:w-[250px] h-[220px]">
                    <Image src={thumbnail} width={250} height={400} className="h-full" alt="Project sample image" />
                  </section>
                  <section className="min-[920px]:flex-1 font-manropeL">
                    <h2 className="font-manropeL text-2xl sm:text-3xl md:text-4xl">{title}</h2>

                    <p className="font-semibold wrap font-manropeL break-normal w-full mt-5 text-sm sm:text-base text-white-650 md:text-xl md:leading-[2rem]">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-5 mb-5 text-sm text-[#444846] capitalize">
                      {tags.split(',').length > 0 &&
                        tags.split(',').map((tag: string) => (
                          <span key={tag} className="border-2 border-[#8D9290] rounded-full px-2 py-1 font-manropeL">
                            {tag}
                          </span>
                        ))}
                    </div>

                    <Link
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#5B8DEF] text-sm md:text-base mt-5 font-manropeL"
                    >
                      Link to project <span className="ml-1 text-base">&#8599;</span>
                    </Link>
                  </section>
                </section>

                <section className="flex justify-end gap-2.5 mt-5 text-base font-semibold pr-5">
                  <span
                    className="text-[#5B8DEF] cursor-pointer font-manropeL"
                    onClick={() => {
                      handleEdit(project);
                      handleSetRoute('add-project');
                    }}
                  >
                    Edit
                  </span>
                  <span className="text-[#FF5C5C] cursor-pointer font-manropeL" onClick={() => handleDelete(id)}>
                    Delete
                  </span>
                </section>

                <div className="bg-[#E1E3E2] w-full h-[1px] mt-5" />
              </>
            );
          })}
      </section>
      <section className="mt-8 sm:mt-16 flex flex-wrap gap-4 justify-between items-center">
        <section>
          <p
            className="text-base font-semibold font-manropeL flex items-center gap-2 text-green-600 cursor-pointer"
            onClick={handleAddNewProject}
          >
            <Add color="#009254" /> Add new project
          </p>
        </section>
        <section className="w-fit flex items-center gap-4">
          <Button onClick={onCloseModal} intent={'secondary'} className="w-full rounded-md sm:w-[6rem]" size={'lg'}>
            Cancel
          </Button>
          <Button className={`w-full rounded-md sm:w-[6rem]`} size={'lg'}>
            {' '}
            Save{' '}
          </Button>
        </section>
      </section>
    </section>
  );
};

export default AllProjectsModal;
