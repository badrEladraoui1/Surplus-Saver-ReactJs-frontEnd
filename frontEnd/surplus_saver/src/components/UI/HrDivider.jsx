/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const HrDivider = forwardRef(
  ({ word, accent, neutral, Secondary, marginY }, ref) => {
    let classes = " divider";
    if (accent) classes += "divider-accent";
    else if (neutral) classes += "divider-neutral";
    else if (Secondary) classes += "divider-secondary";

    return (
      <div ref={ref} className={`my-${marginY}`}>
        <div className={classes}>{word}</div>
      </div>
    );
  }
);

HrDivider.displayName = "HrDivider";

export default HrDivider;
