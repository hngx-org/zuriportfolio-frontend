import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { Data, allRouteOptions } from './project-section-modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loader from '@ui/Loader';

type SingleProjectProps = {
  dataToEdit: Data | null;
  handleSetRoute: (data: allRouteOptions) => void;
};

const SingleProject: React.FC<SingleProjectProps> = ({ dataToEdit, handleSetRoute }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [projectsImages, setProjectsImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSingleProjectData = () => {
    setLoading(true);
    if (dataToEdit !== null) {
      const { title, year, url, thumbnail, tags, description, media, id, projectsImages } = dataToEdit;
      setTitle(title);
      setLink(url);
      setThumbnail(thumbnail);
      setTags(tags);
      setDescription(description);
      setProjectsImages(projectsImages);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSingleProjectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataToEdit]);
  return (
    <>
      {loading ? (
        <>
          <Loader />
          <p className="text-center text-green-400 my-3 font-semibold text-lg animate-pulse">Please wait</p>
        </>
      ) : (
        <section className="space-y-4 p-3">
          <button
            className="bg-green-500 w-6 h-6 rounded-lg ml-auto flex justify-center items-center text-white-100"
            onClick={() => handleSetRoute('view-projects')}
          >
            <AiOutlineClose />
          </button>
          <section className="min-[920px]:flex-1 font-manropeL">
            <h2 className="font-manropeEB text-2xl sm:text-3xl md:text-4xl">{title}</h2>

            <section className="flex flex-wrap gap-3 mt-8 mb-5 text-sm text-[#444846] capitalize">
              {tags.split(',').length > 0 &&
                tags.split(',').map((tag: string) => {
                  if (tag.length > 0) {
                    return (
                      <span key={tag} className="border-2 border-[#8D9290] rounded-full px-2 py-1 font-manropeL">
                        {tag}
                      </span>
                    );
                  }
                })}
            </section>

            <p className="font-semibold font-manropeEB mt-9 text-base sm:text-lg text-white-650 md:text-xl md:leading-[2rem]">
              {description}
            </p>

            <Link
              href={link}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#5B8DEF] text-sm md:text-base mt-5 block"
            >
              Link to project <span className="ml-1 text-base font-manropeL">&#8599;</span>
            </Link>
          </section>
          <section className="pt-7 space-y-5">
            <section className="w-full mx-auto h-[350px]">
              <Image width={0} height={0} src={thumbnail} className="w-full h-full rounded-lg" alt="Project image" />
            </section>
            {projectsImages.map((projectImage) => (
              <section key={projectImage} className="w-full mx-auto h-[350px]">
                <Image
                  width={0}
                  height={0}
                  src={projectImage}
                  className="w-full h-full rounded-lg"
                  alt="Project image"
                />
              </section>
            ))}
          </section>
        </section>
      )}
    </>
  );
};

export default SingleProject;
