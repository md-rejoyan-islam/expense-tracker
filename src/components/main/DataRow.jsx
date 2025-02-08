import { formatDisplayDate } from "../helper";
import { DeleteIcon, EditIcon } from "../SVG";

import PropTypes from "prop-types";

export default function DataRow({
  date,
  amount,
  name,
  handleDelete,
  id,
  setUpdateData,
  operation,
  updateData,
}) {
  return (
    <div
      className={`${
        updateData?.type === "edit" &&
        updateData.operation === operation &&
        updateData?.id === id &&
        "bg-green-50"
      } flex justify-between items-center py-2 relative group cursor-pointer`}
    >
      <div className="px-1 rounded-sm">
        <h3 className="text-base font-medium leading-7 text-gray-600">
          {name}
        </h3>
        <p className="text-xs text-gray-600">{formatDisplayDate(date)}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
          BDT {amount}
        </p>
        {/* 3 Dots */}
        <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
          <button
            className="hover:text-teal-600"
            role="button"
            title="Edit Button"
            onClick={() =>
              setUpdateData({ id, name, amount, date, type: "edit", operation })
            }
          >
            <EditIcon />
          </button>
          <button
            className="hover:text-red-600"
            role="button"
            title="Delete"
            onClick={() => handleDelete(id)}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

DataRow.propTypes = {
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func,
  id: PropTypes.number.isRequired,
  setUpdateData: PropTypes.func,
  operation: PropTypes.string,
  updateData: PropTypes.object,
};
