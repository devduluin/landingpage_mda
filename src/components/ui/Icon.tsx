import React from "react";
import { type LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  name: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  // This is a placeholder for a dynamic icon component.
  // In a real application, you would use a library like lucide-react
  // to dynamically import and render the icon based on the name prop.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
};

export { Icon };
