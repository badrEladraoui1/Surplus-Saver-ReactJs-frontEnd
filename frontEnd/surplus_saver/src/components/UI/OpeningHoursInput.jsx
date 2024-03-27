/* eslint-disable react/prop-types */
import TimePicker from "react-time-picker";

const OpeningHoursInput = ({ value, onChange }) => {
  return (
    <TimePicker
      className="input input-bordered input-lg w-full max-w-xs"
      disableClock={true} // Disable the clock to only show hours and minutes
      value={value}
      onChange={onChange}
    />
  );
};

export default OpeningHoursInput;
