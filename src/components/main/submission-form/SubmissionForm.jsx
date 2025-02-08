import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";

export default function SubmissionForm({
  setData,
  updateData,
  setUpdateData,
  expenseCategories,
  incomeCategories,
}) {
  // operation state
  const [operation, setOperation] = useState("expense");

  // handle operation change
  const handleOperation = (operation) => {
    setOperation(operation);

    // when switching operation clear update data
    setUpdateData({
      id: null,
      name: "",
      date: "",
      amount: "",
      type: "",
      operation,
    });
  };

  // input object
  const inputObj = {
    name: "",
    amount: "",
    date: "",
  };

  // inputs state
  const [inputs, setInputs] = useState({
    income: inputObj,
    expense: inputObj,
  });

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [operation]: {
        ...prevInputs[operation],
        [name]: value,
      },
    }));
  };

  // form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // field validation check
    if (!inputs[operation].name) return toast.error("Category is required");
    if (!inputs[operation].amount) return toast.error("Amount is required");
    if (!inputs[operation].date) return toast.error("Date is required");

    // update data
    if (inputs[operation].type === "edit") {
      setData((prevData) => ({
        ...prevData,
        [`${operation}Data`]: prevData[`${operation}Data`].map((data) =>
          data.id === inputs[operation].id ? inputs[operation] : data
        ),
      }));

      toast.success("Data updated successfully");
      // clear update data
      setUpdateData({
        id: null,
        name: "",
        date: "",
        amount: "",
        type: "",
        operation: "",
      });
    }
    // add data
    else {
      setData((prevData) => ({
        ...prevData,
        [`${operation}Data`]: [
          ...prevData[`${operation}Data`],
          {
            id: prevData[`${operation}Data`].length + 1,
            name: inputs[operation].name,
            date: inputs[operation].date,
            amount: parseInt(inputs[operation].amount),
          },
        ],
      }));
      toast.success("Data added successfully");
      // clear inputs
      setInputs((prevInputs) => ({
        ...prevInputs,
        [operation]: {
          name: "",
          amount: "",
          date: "",
        },
      }));
      // field reset
      e.target.reset();
    }
  };

  useEffect(() => {
    setInputs({
      income: updateData.operation === "income" ? updateData : inputObj,
      expense: updateData.operation === "expense" ? updateData : inputObj,
    });
    setOperation(updateData.operation || "expense");
  }, [updateData]);

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      {/* Operation selector */}
      <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
        <div
          className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
            operation === "expense" && "active"
          }`}
          onClick={() => handleOperation("expense")}
        >
          Expense
        </div>
        <div
          className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
            operation === "income" && "active"
          }`}
          onClick={() => handleOperation("income")}
        >
          Income
        </div>
      </div>

      {/* selected operation form */}
      <form onSubmit={handleFormSubmit}>
        {operation === "expense" ? (
          <ExpenseForm
            categories={expenseCategories}
            inputs={inputs}
            handleInputChange={handleInputChange}
            type={operation}
          />
        ) : (
          <IncomeForm
            categories={incomeCategories}
            inputs={inputs}
            handleInputChange={handleInputChange}
            type={operation}
          />
        )}
        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          {inputs[operation].type === "edit" ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

SubmissionForm.propTypes = {
  setData: PropTypes.func.isRequired,
  updateData: PropTypes.object.isRequired,
  setUpdateData: PropTypes.func.isRequired,
  expenseCategories: PropTypes.array.isRequired,
  incomeCategories: PropTypes.array.isRequired,
};
