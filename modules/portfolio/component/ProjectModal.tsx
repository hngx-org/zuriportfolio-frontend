import React from 'react';
import Image from 'next/image';
import Modal from '@ui/Modal';
import useDisclosure from '../../../hooks/useDisclosure';
import { ProjectModalProps } from '../../../@types';
import projectPlaceholder from '../../public/assets/portfolio/project.png';
import Button from '@ui/Button';

function ProjectModal({
  title = 'Byte Financial App',
  tags = ['UI/UX', 'figma', 'miro', 'Adobe XD', 'miro', 'sketch', 'Adobe XD'],
  description = 'Implemented A/B testing for website redesign, leading to a 40% user retention and a 25% increase in conversion rates, ultimately resulting in a 20% boost in overall revenue.',
  url = '',
  images = [
    { src: projectPlaceholder },
    { src: projectPlaceholder },
    { src: projectPlaceholder },
    { src: projectPlaceholder },
    { src: projectPlaceholder },
    { src: projectPlaceholder },
  ],
}: ProjectModalProps) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Button
        // leftIcon={<I24Support color="#fff" />}
        intent={'primary'}
        size={'md'}
        isLoading={false}
        spinnerColor="#000"
        onClick={onClose}
      >
        Toggle Project Modal
      </Button>
      <Modal isOpen={!isOpen} closeModal={onOpen}>
        <section className="py-6 pt-10 grid gap-4 font-manropeL">
          <h2 className="font-manropeEB text-3xl md:text-4xl">{title}</h2>

          <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-[#444846] capitalize">
            {tags.map((tag, id) => (
              <span key={id} className="border-2 border-[#8D9290] rounded-full px-2 py-1 font-manropeL">
                {tag}
              </span>
            ))}
          </div>

          <p className="font-semibold text-[1rem] text-white-650 md:text-xl md:leading-[2rem]">{description}</p>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#5B8DEF] hover:underline md:text-[1rem]"
          >
            Link to project <span className="ml-1 text-base">&#8599;</span>
          </a>
        </section>

        <section className="my-4 overflow-y-scroll grid grid-cols-2 gap-4">
          {images.map((image, id) => (
            <Image key={id} src={projectPlaceholder} alt="Project sample image" />
          ))}
        </section>
      </Modal>
    </>
  );
}

export default ProjectModal;
