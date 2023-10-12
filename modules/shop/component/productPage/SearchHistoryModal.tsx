// components/SearchHistoryModal.tsx
import { Clock } from 'iconsax-react';
import React, { useEffect } from 'react';

interface SearchHistoryModalProps {
  searchHistory: string[];
  onClose: () => void;
  onClear: () => void;
}

const SearchHistoryModal: React.FC<SearchHistoryModalProps> = ({ searchHistory, onClose, onClear }) => {
  const handleSearchHistoryItemClick = (query: string) => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling when the modal is open

    // Cleanup effect when the modal is closed
    return () => {
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full flex mt-28 justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-white-100 border max-h-40 overflow-y-auto border-white-500 w-1/5 shadow  p-4 rounded-sm transform  transition-transform ease-in-out duration-300">
        <div className="flex items-center justify-between text-xs font-semibold">
          <h6 onClick={onClose} className="cursor-pointer">
            Back
          </h6>
          <h6 onClick={onClear} className="cursor-pointer">
            Clear
          </h6>
        </div>
        <div className="py-4 space-y-2">
          {searchHistory.length > 0 ? (
            searchHistory.map((query, index) => (
              <div
                key={index}
                className="flex items-center gap-1 cursor-pointer text-xs font-normal text-brand-green-shade0"
                onClick={() => handleSearchHistoryItemClick(query)}
              >
                <Clock size="14" color="#464646" />
                <span>{query}</span>
              </div>
            ))
          ) : (
            <div className="text-xs font-normal text-brand-green-shade0">No history available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryModal;
