/* eslint-disable react/prop-types */
const Button = ({
  neutral,
  primary,
  secondary,
  accent,
  ghost,
  link,
  className,
  children,
  error,
  warning,
  info,
  outline_default,
  outline_primary,
  outline_secondary,
  outline_accent,
  outline_error,
  outline_warning,
  ...props
}) => {
  let classes = "btn ";
  if (neutral) classes += "btn-neutral";
  else if (primary) classes += "btn-primary";
  else if (secondary) classes += "btn-secondary";
  else if (accent) classes += "btn-accent";
  else if (ghost) classes += "btn-ghost";
  else if (link) classes += "btn-link";
  else if (error) classes += "btn-error";
  else if (warning) classes += "btn-warning";
  else if (info) classes += "btn-info";
  else if (outline_default) classes += "btn-outline";
  else if (outline_primary) classes += "btn-outline btn-primary";
  else if (outline_secondary) classes += "btn-outline btn-secondary";
  else if (outline_accent) classes += "btn-outline btn-accent";
  else if (outline_error) classes += "btn-outline btn-error";
  else if (outline_warning) classes += "btn-outline btn-warning";

  return (
    <button {...props} className={`${classes} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
