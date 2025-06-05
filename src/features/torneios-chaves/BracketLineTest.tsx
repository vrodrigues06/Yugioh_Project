import React from "react";

interface BracketLineTestProps {
  lineHeight?: number;
  color?: string;
}

const BracketLineTest: React.FC<BracketLineTestProps> = ({
  lineHeight = 60,
  color = "#fef3c7", // amber-50
}) => {
  return (
    <span
      className="absolute h-px w-3 -right-3 translate-y-1/2"
      style={{ backgroundColor: color }}
    >
      {/* Linha vertical (filha) */}
      <span
        className="absolute w-0.5"
        style={{
          height: `${lineHeight}px`,
          top: "calc(100% - 1px)",
          left: "100%",
          backgroundColor: color,
        }}
      >
        {/* Linha horizontal final */}
        <span
          className="absolute h-px w-3"
          style={{
            top: "calc(100% - 1px)",
            left: "calc(100% - 1px)",
            backgroundColor: color,
          }}
        />
      </span>
    </span>
  );
};

export default BracketLineTest;
