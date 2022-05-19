import React from "react";

const CodeBlock = ({ children }) => {
  return (
    <div className="codeblock__container mx-3 my-2 flex-1 p-3">
      <pre>{children}</pre>
    </div>
  );
};

export default CodeBlock;
