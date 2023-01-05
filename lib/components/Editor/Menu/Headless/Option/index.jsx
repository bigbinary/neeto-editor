import React from "react";

import { EDITOR_OPTIONS } from "common/constants";
import { humanize } from "neetocommons/pure";

import Emoji from "./Emoji";
import Button from "./UI/Button";

const Option = ({ editor, optionName, command, disabled, Icon, active }) => {
  if (optionName === EDITOR_OPTIONS.EMOJI) {
    return <Emoji editor={editor} optionName={optionName} />;
  }

  return (
    <Button
      className={active ? "ne-headless-btn--active" : ""}
      disabled={disabled}
      icon={Icon}
      tooltipProps={{
        content: humanize(optionName),
        delay: [500],
        position: "bottom",
      }}
      onClick={command}
    />
  );
};

export default Option;
