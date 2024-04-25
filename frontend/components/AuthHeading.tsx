import React from "react";

interface AuthHeadingProps {
  label: string;
}

const AuthHeading: React.FC<AuthHeadingProps> = ({ label }) => {
  return <div className="font-bold font-serif text-4xl pt-4">{label}</div>;
};

export default AuthHeading;
