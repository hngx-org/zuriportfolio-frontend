import React from 'react';
import Image from 'next/image';
import Modal from '@ui/Modal';
import useDisclosure from '../../hooks/useDisclosure';
import { ProjectModalProps } from '../../@types';
import projectPlaceholder from '../../public/assets/images/portfolio/project.png';
import Button from '@ui/Button';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';

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
      <Modal size="lg" isOpen={!isOpen} closeModal={onOpen}>
        <section className="space-y-4 p-3">
          <button
            className="bg-green-500 w-6 h-6 rounded-lg ml-auto flex justify-center items-center text-white-100"
            onClick={onClose}
          >
            <AiOutlineClose />
          </button>
          <section className="min-[920px]:flex-1 font-manropeL">
            <h2 className="font-manropeEB text-2xl sm:text-3xl md:text-4xl">{title}</h2>

            <section className="flex flex-wrap gap-3 mt-8 mb-5 text-sm text-[#444846] capitalize">
              {tags.map((tag, id) => (
                <span key={id} className="border border-[#8D9290] rounded-full px-2 py-1 font-manropeL">
                  {tag}
                </span>
              ))}
            </section>

            <p className="font-semibold font-manropeEB mt-9 text-base sm:text-lg text-white-650 md:text-xl md:leading-[2rem]">
              {description}
            </p>

            <Link
              href={url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#5B8DEF] text-sm md:text-base mt-5 block"
            >
              Link to project <span className="ml-1 text-base font-manropeL">&#8599;</span>
            </Link>
          </section>
          <section className="pt-7 space-y-5">
            <section className="w-full mx-auto h-[350px]">
              <Image src={projectPlaceholder} className="w-full h-full rounded-lg" alt="Project sample image" />
            </section>
            <section className="w-full mx-auto h-[350px]">
              <Image src={projectPlaceholder} className="w-full h-full rounded-lg" alt="Project sample image" />
            </section>
            <section className="w-full mx-auto h-[350px]">
              <Image src={projectPlaceholder} className="w-full h-full rounded-lg" alt="Project sample image" />
            </section>
          </section>
        </section>
      </Modal>
    </>
  );
}

export default ProjectModal;
