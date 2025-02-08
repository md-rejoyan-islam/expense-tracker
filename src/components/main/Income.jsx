import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IncomeIcon } from "../SVG";
import DataRow from "./DataRow";
import Filtering from "./Filtering";
import Sorting from "./Sorting";

export default function Income({
  incomeData,
  setData,
  setUpdateData,
  updateData,
  filterOptions,
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredData, setFilteredData] = useState(incomeData);

  // Filter Handler
  const handleFilter = (key) => {
    const filters = [...selectedFilter];

    if (filters.includes(key)) {
      filters.splice(filters.indexOf(key), 1);
    } else {
      filters.push(key);
    }

    // update state
    setSelectedFilter(filters);

    // Filtering Data
    setFilteredData(
      filters.length > 0
        ? incomeData.filter((expense) => filters.includes(expense.name))
        : incomeData
    );
  };

  // Sorting Handler
  const handleSorting = (key) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (key === "asc") {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });

    setFilteredData(sortedData);
  };

  // handle delete
  const handleDelete = (id) => {
    // show alert
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const updatedData = incomeData.filter((data) => data.id !== id);
    setData((prev) => ({ ...prev, incomeData: updatedData }));
    setFilteredData(updatedData);
  };

  useEffect(() => {
    setFilteredData(incomeData);
    setSelectedFilter([]);
  }, [incomeData]);

  return (
    <div className="border rounded-md relative">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
            <IncomeIcon />
          </div>
          {/* Text */}
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              Income
            </h3>
          </div>
        </div>
        <div className="space-x-1">
          {/* Sorting */}
          <Sorting handleSorting={handleSorting} />
          {/* Filtering */}
          <Filtering
            filterOptions={filterOptions}
            selectedFilter={selectedFilter}
            handleFilter={handleFilter}
          />
        </div>
      </div>
      <div className="p-4 divide-y">
        {filteredData.map((data) => (
          <DataRow
            key={data.id}
            amount={data.amount}
            name={data.name}
            date={data.date}
            id={data.id}
            operation="income"
            setUpdateData={setUpdateData}
            handleDelete={handleDelete}
            updateData={updateData}
          />
        ))}
      </div>
    </div>
  );
}

Income.propTypes = {
  incomeData: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  setUpdateData: PropTypes.func.isRequired,
  updateData: PropTypes.object,
  filterOptions: PropTypes.array.isRequired,
};
