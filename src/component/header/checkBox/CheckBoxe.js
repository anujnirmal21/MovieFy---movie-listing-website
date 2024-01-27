import React, { useState } from "react";

export default function CheckBoxe({ id, name, handleChange, uncheck }) {
  const [isChecked, setIsChecked] = useState(false);
  async function handleClick() {
    setIsChecked(!isChecked);
  }

  return (
    <li>
      <div className="flex items-center">
        <input
          onChange={handleChange}
          id="genere"
          type="checkbox"
          value={id}
          checked={uncheck ? false : isChecked}
          onClick={handleClick}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          htmlFor="checkbox-item-1"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {name}
        </label>
      </div>
    </li>
  );
}
