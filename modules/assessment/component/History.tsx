import React, { useState, useRef } from 'react';
import Button from '@ui/Button';
import { FaDownload, FaSearch, FaClipboardList, FaFilter, FaUser, FaStar, FaUserTie } from 'react-icons/fa';
import Pagination from '@ui/Pagination';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAssessmentHistory } from '../../../http/userTakenAssessment';
import Loader from '@ui/Loader';
import { useQuery } from '@tanstack/react-query';

// Define a type or interface for the assessment data
interface Assessment {
  id: string;
  user_id: string;
  assessment_id: number;
  assessment_name: string;
  skill_id: number;
  score: number;
  status: string;
  submission_date: string;
  badge_id: number;
  badge_name: string;
}

const History: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showFilters, setShowFilters] = useState(true);
  const [expandedAssessment, setExpandedAssessment] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);

  const {
    isLoading,
    isError,
    error,
    data: assessmentsHistory,
  } = useQuery(['assessmentsHistory'], () => fetchAssessmentHistory(tokenRef.current as string));
  console.log('history', assessmentsHistory);

  

  React.useEffect(() => {
    tokenRef.current = localStorage.getItem('zpt');
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const toggleExpand = (id: string) => {
    setExpandedAssessment((prev) => (prev === id ? null : id));
  };
  const handleLevelFilter = (level: string) => {
    setSelectedLevel(level);
    setCurrentPage(1);
  };

  const filteredAssessments = assessmentsHistory?.filter(
      (assessment: Assessment) =>
        assessment.assessment_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedLevel === 'All' ? true : assessment.badge_name?.toLowerCase() === selectedLevel),
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalItems = Math.ceil(filteredAssessments?.length / itemsPerPage);

  return (
    <div className="w-full font-manropeEL">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="w-full md:p-8 px-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex  p-4 flex-col">
              <h2 className="text-3xl font-bold mb-2 text-brand-green-primary">Assessments History</h2>
              <p className="text-gray-600">View and Download previously taken assessments</p>
            </div>
          </div>
          <div
            id="table"
            className={`flex items-center sm:flex-row flex-col mb-4 gap-3 w-full m-auto align-middle justify-between ${
              showFilters ? 'flex-col' : 'sm:flex'
            }`}
          >
            <div className="relative w-full sm:max-w-xs sm:flex-col flex">
              <input
                type="text"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 w-full rounded-full border border-gray-300 outline-none focus:ring focus:ring-brand-green-hover"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-400" />
              </div>
            </div>

            <div className="sm:hidden w-full flex items-end justify-end">
              <Image
                src={`${showFilters ? '/assets/icons/close.svg' : '/assets/filter.svg'}`}
                alt="filter"
                width={30}
                height={30}
                className="text-brand-green-primary text-[1.2em] text-end justify-end cursor-pointer"
                onClick={() => setShowFilters(!showFilters)}
              />
            </div>
            {showFilters && (
              <div className="flex items-center flex-wrap sm:w-fit w-full  space-x-2 ">
                <button
                  className={
                    selectedLevel === 'All'
                      ? 'bg-brand-green-primary text-white-100 rounded-lg px-2 py-1'
                      : 'text-brand-green-primary'
                  }
                  onClick={() => handleLevelFilter('All')}
                >
                  All Levels
                </button>
                <button
                  className={
                    selectedLevel === 'beginner'
                      ? 'bg-brand-green-primary text-white-100 rounded-lg px-2 py-1'
                      : 'text-brand-green-primary'
                  }
                  onClick={() => handleLevelFilter('beginner')}
                >
                  Beginner
                </button>
                <button
                  className={
                    selectedLevel === 'intermediate'
                      ? 'bg-brand-green-primary text-white-100 rounded-lg px-2 py-1'
                      : 'text-brand-green-primary'
                  }
                  onClick={() => handleLevelFilter('intermediate')}
                >
                  Intermediate
                </button>
                <button
                  className={
                    selectedLevel === 'expert'
                      ? 'bg-brand-green-primary text-white-100 rounded-lg px-2 py-1'
                      : 'text-brand-green-primary'
                  }
                  onClick={() => handleLevelFilter('expert')}
                >
                  Expert
                </button>
              </div>
            )}
          </div>

          <div className=" border-gray-300 rounded-lg overflow-x-auto overscroll">
            <table className="min-w-full border-collapse table-auto mb-5">
              <thead>
                <tr className="bg-brand-green-shade50 text-white-100 w-full ">
                  <th scope="col" className="border w-fit border-gray-300 py-2 px-4 text-left ">
                    Assessment Taken
                  </th>
                  <th scope="col" className="border w-fit hidden sm:table-cell border-gray-300 py-2 px-4 text-left ">
                    Badge Level
                  </th>

                  <th scope="col" className="border w-fit hidden sm:table-cell border-gray-300 py-2 px-4 text-left ">
                    Date
                  </th>
                  <th scope="col" className="border w-fit border-gray-300 hidden sm:table-cell py-2 px-4 text-left ">
                    Score
                  </th>
                  <th scope="col" className="border w-fit border-gray-300 py-2 px-4 text-left hidden sm:table-cell ">
                    Actions
                  </th>
                </tr>
              </thead>
              {filteredAssessments?.length === 0 || filteredAssessments == null ? (
                <tbody>
                  <tr className="text-center text-gray-500 font-bold text-lg">
                    <td>You have not taken any assessments to earn badge.</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredAssessments?.map((assessment: Assessment) => (
                    <React.Fragment key={assessment.id}>
                      <tr onClick={() => toggleExpand(assessment.id)} className="bg-white border ">
                        <td className="border-r whitespace-nowrap  border-l-[0] border-b-0 border-gray-300 items-center gap-2 flex py-2 px-4 text-left cursor-pointer">
                          <FaClipboardList className="text-green-200 text-[2em] " />
                          {assessment.assessment_name}
                          <Image
                            src="/assets/expand.svg"
                            width={20}
                            height={20}
                            alt="icon"
                            className="ml-auto sm:hidden"
                          />
                        </td>
                        <td
                          onClick={() => toggleExpand(assessment.id)}
                          className="whitespace-nowrap border-r border-b-0 cursor-pointer border-gray-300 py-2 px-4 hidden sm:table-cell"
                        >
                          {assessment.badge_name === 'Beginner' && (
                            <span className="flex items-center">
                              <FaUser className="mr-1 text-blue-500" />
                              Beginner
                            </span>
                          )}
                          {assessment.badge_name === 'Intermediate' && (
                            <span className="flex items-center">
                              <FaUserTie className="mr-1 text-green-200" />
                              Intermediate
                            </span>
                          )}
                          {assessment.badge_name === 'Expert' && (
                            <span className="flex items-center">
                              <FaStar className="mr-1 text-[#f8eb3b]" />
                              Expert
                            </span>
                          )}
                        </td>

                        <td className="whitespace-nowrap border-r hidden sm:table-cell  border-gray-300 border-b-0 py-2 px-4">
                          {formatDate(assessment.submission_date)}
                        </td>
                        <td className="whitespace-nowrap border-r hidden sm:table-cell  border-b-0 border-gray-300 py-2 px-4">
                          {assessment.score}/100
                        </td>
                        <td className="whitespace-nowrap hidden sm:table-cell  border border-b-0 border-gray-300 py-2 px-4">
                          <Link
                            href={`/assessments/dashboard/badge/[id]`}
                            as={`/assessments/dashboard/badge/${assessment.badge_id}`}
                            className="hover:underline hover:text-green-200"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                      {expandedAssessment === assessment.id && (
                        <tr className="sm:hidden w-full col-span-2 p-4" aria-colspan={2}>
                          <td className=" p-4  gap-4 " colSpan={2}>
                            {assessment.badge_name === 'Beginner' && (
                              <span className="flex items-center p-2">
                                <FaUser className="mr-1 text-blue-500" />
                                Beginner
                              </span>
                            )}
                            {assessment.badge_name === 'Intermediate' && (
                              <span className="flex items-center p-2">
                                <FaUserTie className="mr-1 text-green-200" />
                                Intermediate
                              </span>
                            )}
                            {assessment.badge_name === 'Expert' && (
                              <span className="flex items-center p-2">
                                <FaStar className="mr-1 text-[#f8eb3b]" />
                                Expert
                              </span>
                            )}
                            <div className="p-2">Date: {formatDate(assessment?.submission_date)}</div>
                            <div className="p-2">Score: {assessment.score}/100</div>

                            <Link
                              href={`/assessments/dashboard/badge/[id]`}
                              as={`/assessments/dashboard/badge/${assessment.badge_id}`}
                              className="hover:underline hover:text-green-200 p-2"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          <a href="#table" className="pagination flex justify-center items-center mt-5 w-fit mx-auto">
            <Pagination
              page={currentPage}
              setPage={setCurrentPage}
              pages={totalItems}
              activePage={currentPage}
              visiblePaginatedBtn={5}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default History;
