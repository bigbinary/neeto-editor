import React from "react";

const CodeBlock = ({ children }) => {
  return (
    <div className="flex-1 p-3 mx-3 my-2 codeblock__container">
      <pre>{children}</pre>
    </div>
  );
};

export default CodeBlock;
