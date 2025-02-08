import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ExpenseIcon } from "../SVG";
import DataRow from "./DataRow";
import Filtering from "./Filtering";
import Sorting from "./Sorting";

export default function Expense({
  expenseData,
  setData,
  setUpdateData,
  updateData,
  filterOptions,
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filteredData, setFilteredData] = useState(expenseData);

  // Filter Handler
  const handleFilter = (key) => {
    const filters = [...selectedFilter];

    if (filters.includes(key)) {
      filters.splice(filters.indexOf(key), 1);
    } else {
      filters.push(key);
    }

    // update selected filter
    setSelectedFilter(filters);

    // update filtered data
    setFilteredData(
      filters.length > 0
        ? expenseData.filter((expense) => filters.includes(expense.name))
        : expenseData
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

    const updatedData = expenseData.filter((data) => data.id !== id);
    setData((prev) => ({ ...prev, expenseData: updatedData }));
    setFilteredData(updatedData);
  };

  useEffect(() => {
    setFilteredData(expenseData);
    setSelectedFilter([]);
  }, [expenseData]);

  return (
    <div className="border rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base">
            <ExpenseIcon />
          </div>
          {/* Text */}
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              Expense
            </h3>
          </div>
        </div>
        {/* Sorting and Filtering Column */}
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
        {/* Sorting and Filtering Column Ends */}
      </div>
      <div className="p-4 divide-y">
        {filteredData?.map((expense) => (
          <DataRow
            key={expense.id}
            amount={expense.amount}
            name={expense.name}
            date={expense.date}
            id={expense.id}
            operation={"expense"}
            setUpdateData={setUpdateData}
            handleDelete={handleDelete}
            updateData={updateData}
          />
        ))}
      </div>
    </div>
  );
}

Expense.propTypes = {
  expenseData: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  setUpdateData: PropTypes.func,
  updateData: PropTypes.object,
  filterOptions: PropTypes.array.isRequired,
};
