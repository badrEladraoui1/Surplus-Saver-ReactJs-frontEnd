/* eslint-disable react/prop-types */
const HrDivider = ({ word, accent, neutral, Secondary, marginY }) => {
  let classes = " divider";
  if (accent) classes += "divider-accent";
  else if (neutral) classes += "divider-neutral";
  else if (Secondary) classes += "divider-secondary";

  return (
    <div className={`my-${marginY}`}>
      <div className={classes}>{word}</div>
    </div>
  );
};

export default HrDivider;
