import { DateField, InputField, SelectField } from "./Fields";

import PropTypes from "prop-types";

export default function ExpenseForm({
  categories,
  inputs,
  handleInputChange,
  type,
}) {
  return (
    <div>
      <SelectField
        categories={categories}
        inputs={inputs}
        handleInputChange={handleInputChange}
        type={type}
      />
      <InputField
        inputs={inputs}
        handleInputChange={handleInputChange}
        type={type}
      />
      <DateField
        inputs={inputs}
        handleInputChange={handleInputChange}
        type={type}
      />
    </div>
  );
}

ExpenseForm.propTypes = {
  categories: PropTypes.array.isRequired,
  inputs: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
