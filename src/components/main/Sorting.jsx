import { SortingIcon } from "../SVG";
import useClickAwayToggle from "../useClickAwayToggle";

import PropTypes from "prop-types";

export default function Sorting({ handleSorting }) {
  const {
    buttonRef: sortingBtnRef,
    divRef: sortingDivRef,
    handleButtonClick: handleSortingBtnClick,
    isDivVisible: isSortingDivVisible,
  } = useClickAwayToggle();

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          ref={sortingBtnRef}
          onClick={handleSortingBtnClick}
        >
          <SortingIcon />
        </button>
      </div>
      {isSortingDivVisible && (
        <div
          className="absolute z-10 mt-2 right-0 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          ref={sortingDivRef}
        >
          <div className="py-1 w-full" role="none">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-100 transition-all"
              onClick={() => handleSorting("asc")}
            >
              Low to High
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 hover:bg-gray-50 transition-all"
              onClick={() => handleSorting("desc")}
            >
              High to Low
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Sorting.propTypes = {
  handleSorting: PropTypes.func.isRequired,
};
