import React, { useState } from 'react';
import Button from '@ui/Button';
import { FaDownload, FaStar, FaUser, FaUserTie, FaSearch, FaClipboardList } from 'react-icons/fa';
import Pagination from '@ui/Pagination';

const mockAssessments = [
  {
    id: '1',
    date: '2023-10-05T10:30:00Z',
    assessment: 'Mock Assessment 1',
    badgeName: 'Beginner',
    score: 80,
    downloadLink: 'https://example.com/badge1.pdf',
  },
  {
    id: '2',
    date: '2023-10-05T10:30:00Z',
    assessment: 'Mock Assessment 2',
    badgeName: 'Intermediate',
    score: 80,
    downloadLink: 'https://example.com/badge1.pdf',
  },
  {
    id: '3',
    date: '2023-10-05T10:30:00Z',
    assessment: 'Mock Assessment 3',
    badgeName: 'Expert',
    score: 80,
    downloadLink: 'https://example.com/badge1.pdf',
  },
];

const History: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [assessments, setAssessments] = useState(mockAssessments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedAssessment, setExpandedAssessment] = useState<string | null>(null);

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

  const filteredAssessments = assessments
    .filter(
      (assessment) =>
        assessment.assessment.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedLevel === 'All' ? true : assessment.badgeName === selectedLevel)
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalItems = Math.ceil(filteredAssessments.length / itemsPerPage);

  return (
    <div className="w-full font-manropeEL">
      <div className="w-full p-8 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex p-4 flex-col">
            <h2 className="text-3xl mb-2 text-brand-green-primary">Assessments History</h2>
            <p className="text-gray-600">View and Download previously taken assessments</p>
          </div>
       
        </div>
        <div className={`flex items-center sm:flex-row flex-col mb-4 justify-between ${showFilters ? 'flex-col' : 'sm:flex'}`}>
          {!showFilters && (
            <div className="relative w-fit sm:flex-col flex">
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
          )}
          <div className="flex space-x-2 mt-4 lg:mt-0">
            <button
              className={selectedLevel === 'All' ? 'bg-brand-green-primary text-white-100 rounded-lg px-2 py-1' : 'text-brand-green-primary'}
              onClick={() => handleLevelFilter('All')}
            >
              All Levels
            </button>
            <button
              className={selectedLevel === 'Beginner' ? 'bg-brand-green-primary text-white-100 rounded-lg px-2 py-1' : 'text-brand-green-primary'}
              onClick={() => handleLevelFilter('Beginner')}
            >
              Beginner
            </button>
            <button
              className={selectedLevel === 'Intermediate' ? 'bg-brand-green-primary text-white-100 rounded-lg px-2 py-1' : 'text-brand-green-primary'}
              onClick={() => handleLevelFilter('Intermediate')}
            >
              Intermediate
            </button>
            <button
              className={selectedLevel === 'Expert' ? 'bg-brand-green-primary text-white-100 rounded-lg px-2 py-1' : 'text-brand-green-primary'}
              onClick={() => handleLevelFilter('Expert')}
            >
              Expert
            </button>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg overflow-x-auto">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-brand-green-shade50 text-white-100">
                <th className="border border-gray-300 py-2 px-4 text-left">Assessment Taken</th>
                <th className="border border-gray-300 py-2 px-4 text-left">Date</th>
                <th className="border border-gray-300 py-2 px-4 text-left">Badge Level</th>
                <th className="border border-gray-300 py-2 px-4 text-left">Score</th>
                <th className="border border-gray-300 py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.map((assessment) => (
                <React.Fragment key={assessment.id}>
                  <tr className="bg-white">
                    <td
                      className="border border-l-[0] border-gray-300 items-center gap-2 flex py-2 px-4 text-left cursor-pointer"
                      onClick={() => toggleExpand(assessment.id)}
                    >
                      <FaClipboardList className="text-green-200 text-[2em] " />
                      {assessment.assessment}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">{formatDate(assessment.date)}</td>
                    <td className="border border-gray-300 py-2 px-4">
                      {assessment.badgeName === 'Beginner' && (
                        <span className="flex items-center">
                          <FaUser className="mr-1 text-blue-500" /> Beginner
                        </span>
                      )}
                      {assessment.badgeName === 'Intermediate' && (
                        <span className="flex items-center">
                          <FaUserTie className="mr-1 text-green-200" /> Intermediate
                        </span>
                      )}
                      {assessment.badgeName === 'Expert' && (
                        <span className="flex items-center">
                          <FaStar className="mr-1 text-[#f8eb3b]" /> Expert
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">{assessment.score}/100</td>
                    <td className="border border-gray-300 py-2 px-4">
                      <a
                        href={assessment.downloadLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-brand-green-primary hover:text-brand-green-hover"
                      >
                        <FaDownload className="mr-1" /> Download
                      </a>
                    </td>
                  </tr>
                  {expandedAssessment === assessment.id && (
                    <tr className="bg-white">
                      <td colSpan={5} className="border border-gray-300 p-4">
                        {/* Additional Details Here */}
                        {/* Example:
                          <div>Date: {formatDate(assessment.date)}</div>
                          <div>Score: {assessment.score}/100</div>
                        */}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination flex justify-between items-center mt-5 w-full">
          <Pagination
            page={currentPage}
            setPage={setCurrentPage}
            pages={totalItems}
            activePage={currentPage}
            visiblePaginatedBtn={5}
          />
        </div>
      </div>
    </div>
  );
};

export default History;