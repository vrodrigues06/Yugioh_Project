import React from "react";

interface BracketLineProps {
  color?: string;
  roundIdx: number;
  preliminarDupla?: boolean;
}

const BracketLine: React.FC<BracketLineProps> = ({
  color = "#fef3c7", // amber-50
  roundIdx,
  preliminarDupla = false,
}) => {
  let lineHeight;

  if (roundIdx === 0) lineHeight = 60;
  if (roundIdx === 1) lineHeight = 120;
  if (roundIdx === 2) lineHeight = 230;
  if (roundIdx === 3) lineHeight = 457;

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
          className="absolute h-px "
          style={{
            width: preliminarDupla ? `280px` : "12px",
            top: "calc(100% - 1px)",
            left: "calc(100% - 1px)",
            backgroundColor: color,
          }}
        />
      </span>
    </span>
  );
};

export default BracketLine;
