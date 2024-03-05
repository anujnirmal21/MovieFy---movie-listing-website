import React, { useState } from "react";

export default function CheckBoxe({ id, name, handleChange }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
    handleChange(id);
  };

  return (
    <li>
      <div className="flex items-center">
        <input
          onChange={handleClick}
          id={`checkbox-item-${id}`}
          type="checkbox"
          value={id}
          checked={isChecked}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          htmlFor={`checkbox-item-${id}`}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {name}
        </label>
      </div>
    </li>
  );
}
