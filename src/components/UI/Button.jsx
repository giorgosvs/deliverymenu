import React from "react";

export const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly ? "text-button" : "button"; //choose class based on text
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};
