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
}) => {
  let classes = "btn ";
  if (neutral) classes += "btn-neutral";
  else if (primary) classes += "btn-primary";
  else if (secondary) classes += "btn-secondary";
  else if (accent) classes += "btn-accent";
  else if (ghost) classes += "btn-ghost";
  else if (link) classes += "btn-link";

  return <button className={`${classes} ${className}`}>{children}</button>;
};

export default Button;
