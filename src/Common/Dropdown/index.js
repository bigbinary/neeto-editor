import React, { useState, useRef } from "react";
import classNames from "classnames";
import { FaChevronDown } from "react-icons/fa";

import useOutsideClick from "../../hooks/useOutsideClick";

const Dropdown = ({
  label,
  Icon = DefaultIcon,
  value,
  options,
  onChange,
  className,
}) => {
  const [isOpened, setOpened] = useState(false);
  const containerRef = useRef();

  useOutsideClick({ ref: containerRef, onClick: () => setOpened(false) });

  const getTriggerLabel = () => {
    if (value) {
      const targetOption = options.find((option) => option.value === value);
      if (targetOption) return targetOption.label;
    }
    return label;
  };

  return (
    <div
      className={classNames("neeto-editor-dropdown", {
        [className]: className,
      })}
      onClick={() => setOpened((isOpened) => !isOpened)}
      ref={containerRef}
    >
      {label ? <span className="mr-1">{getTriggerLabel()}</span> : null}
      <Icon />
      {isOpened ? (
        <ul className="shadow-md neeto-editor-dropdown__actions">
          {options.map(({ label, value }) => (
            <li onClick={() => onChange(value)}>{label}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;

const DefaultIcon = () => <FaChevronDown size={14} className="inline-block" />;
