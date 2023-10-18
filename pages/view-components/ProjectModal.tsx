import React from 'react';
import Image from 'next/image';
import Modal from '@ui/Modal';
import useDisclosure from '../../hooks/useDisclosure';
import { ProjectModalProps } from '../../@types';
import projectPlaceholder from '../../public/assets/images/portfolio/project.png';
import Button from '@ui/Button';
import Link from 'next/link';

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
      <Modal size="xxl" isOpen={!isOpen} closeModal={onOpen}>
        <section className="flex flex-wrap gap-10 mt-10">
          <section className="w-full min-[920px]:w-[300px] h-[300px]">
            <Image src={projectPlaceholder} className="w-full h-full" alt="Project sample image" />
          </section>
          <section className="min-[920px]:flex-1 font-manropeL">
            <h2 className="font-manropeEB text-2xl sm:text-3xl md:text-4xl">{title}</h2>

            <p className="font-semibold mt-5 text-sm sm:text-base text-white-650 md:text-xl md:leading-[2rem]">
              {description}
            </p>

            <div className="flex flex-wrap gap-3 mt-5 mb-5 text-sm text-[#444846] capitalize">
              {tags.map((tag, id) => (
                <span key={id} className="border-2 border-[#8D9290] rounded-full px-2 py-1 font-manropeL">
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#5B8DEF] text-sm md:text-base mt-5"
            >
              Link to project <span className="ml-1 text-base">&#8599;</span>
            </Link>
          </section>
        </section>
      </Modal>
    </>
  );
}

export default ProjectModal;
