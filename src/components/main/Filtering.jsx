import { FilteringIcon } from "../SVG";
import useClickAwayToggle from "../useClickAwayToggle";

import PropTypes from "prop-types";

export default function Filtering({
  filterOptions,
  selectedFilter,
  handleFilter,
}) {
  const {
    buttonRef: filterBtnRef,
    divRef: filterDivRef,
    handleButtonClick: handleFilterBtnClick,
    isDivVisible: isFilterDivVisible,
  } = useClickAwayToggle();
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          ref={filterBtnRef}
          onClick={handleFilterBtnClick}
        >
          <FilteringIcon />
        </button>
      </div>
      {isFilterDivVisible && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          ref={filterDivRef}
        >
          <div className="py-1" role="none">
            {filterOptions.map((option) => (
              <label
                className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
                key={option.id}
              >
                <input
                  type="checkbox"
                  checked={selectedFilter.includes(option.name)}
                  className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                  id="filter-option-1"
                  onChange={() => handleFilter(option.name)}
                />
                <span className="ml-2">{option.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Filtering.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  selectedFilter: PropTypes.array.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
