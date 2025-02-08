import PropTypes from "prop-types";
import { formatDate } from "../../helper";

const commonProps = {
  inputs: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export const SelectField = ({
  categories,
  inputs,
  handleInputChange,
  type,
}) => {
  return (
    <div className="mt-3">
      <label
        htmlFor="category"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Category
      </label>
      <div className="mt-2">
        <select
          id="category"
          name="name"
          autoComplete="category-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
          // required
          value={type === "expense" ? inputs.expense.name : inputs.income.name}
          onChange={(e) =>
            handleInputChange({
              target: {
                name: "name",
                value: e.target.value,
              },
            })
          }
        >
          <option>Select a category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

SelectField.propTypes = {
  categories: PropTypes.array.isRequired,
  ...commonProps,
};

export const InputField = ({ inputs, handleInputChange, type }) => {
  return (
    <div className="mt-3">
      <label
        htmlFor="amount"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Amount
      </label>
      <div className="mt-2">
        <input
          type="number"
          name="amount"
          id="amount"
          // required
          value={
            type === "expense" ? inputs.expense.amount : inputs.income.amount
          }
          onChange={(e) =>
            handleInputChange({
              target: {
                name: "amount",
                value: +e.target.value,
              },
            })
          }
          autoComplete="off"
          placeholder={12931}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

InputField.propTypes = {
  ...commonProps,
};

export const DateField = ({ inputs, handleInputChange, type }) => {
  return (
    <div className="mt-3">
      <label
        htmlFor="date"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Date
      </label>
      <div className="mt-2">
        <input
          type="date"
          name="date"
          id="date"
          // required
          value={
            type === "expense"
              ? formatDate(inputs.expense.date)
              : formatDate(inputs.income.date)
          }
          onChange={(e) =>
            handleInputChange({
              target: {
                name: "date",
                value: e.target.value,
              },
            })
          }
          autoComplete="off"
          placeholder={12931}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

DateField.propTypes = {
  ...commonProps,
};
