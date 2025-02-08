import PropTypes from "prop-types";
import { DateField, InputField, SelectField } from "./Fields";

export default function IncomeForm({
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

IncomeForm.propTypes = {
  categories: PropTypes.array.isRequired,
  inputs: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
