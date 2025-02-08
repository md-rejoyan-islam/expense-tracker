import { useState } from "react";
import {
  expenseCategories,
  expenseData,
  incomeCategories,
  incomeData,
} from "../../data/data";
import { totalStat } from "../helper";
import Expense from "./Expense";
import Income from "./Income";
import SubmissionForm from "./submission-form/SubmissionForm";
import TotalBalanceStat from "./TotalBalanceStat";

export default function Main() {
  // data state
  const [data, setData] = useState({
    incomeData: incomeData,
    expenseData: expenseData,
  });

  // total stat calculation
  const { totalIncome, totalExpense, balance } = totalStat({
    incomeData: data.incomeData,
    expenseData: data.expenseData,
  });

  // editable data
  const [updateData, setUpdateData] = useState({
    id: null,
    category: "",
    date: "",
    amount: "",
    type: "",
    operation: "",
  });

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl px-2 pb-10">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Submission Form */}
        <SubmissionForm
          setData={setData}
          updateData={updateData}
          setUpdateData={setUpdateData}
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
        />

        {/* Right Column */}
        <div className="lg:col-span-2">
          {/* Total Balance Stat*/}
          <TotalBalanceStat
            balance={balance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />

          {/* List Down */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            {/* Income */}
            <Income
              incomeData={data.incomeData}
              setData={setData}
              setUpdateData={setUpdateData}
              updateData={updateData}
              filterOptions={incomeCategories}
            />

            {/* Expense */}
            <Expense
              expenseData={data.expenseData}
              setData={setData}
              setUpdateData={setUpdateData}
              updateData={updateData}
              filterOptions={expenseCategories}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
