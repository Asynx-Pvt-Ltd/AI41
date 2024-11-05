import React from "react";

const FormattedContent = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none w-full">
      <div
        className="text-gray-600 mb-4 text-left whitespace-pre-wrap break-words leading-relaxed"
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
};

export default FormattedContent;
