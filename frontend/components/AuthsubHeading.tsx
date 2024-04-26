import React from "react";

interface subHeadingProps {
  label: string;
}

const SubHeading: React.FC<subHeadingProps> = ({ label }) => {
  return <div className=" font-extralight pt-2">{label}</div>;
};

export default SubHeading;
