import React from "react";

interface BracketLineProps {
  color?: string;
  roundIdx: number;
  preliminarDupla?: boolean;
}

/**
 * Bracket espelhado (vira para a ESQUERDA).
 *
 * ──┐
 *   │
 *   └─
 */
const ReversedBracketLine: React.FC<BracketLineProps> = ({
  roundIdx,
  color = "#fef3c7", // amber-50
  preliminarDupla = false,
}) => {
  let lineHeight;

  if (roundIdx === 0) lineHeight = 55;
  if (roundIdx === 1) lineHeight = 110;
  if (roundIdx === 2) lineHeight = 227;
  if (roundIdx === 3) lineHeight = 456;

  return (
    /* 1ª linha – horizontal, saindo para a ESQUERDA */
    <span
      className="absolute h-px w-3 -right-[12px]  rotate-180"
      style={{ backgroundColor: color }}
    >
      {/* 2ª linha – vertical, embaixo da 1ª */}
      <span
        className="absolute w-0.5"
        style={{
          height: `${lineHeight}px`,
          top: "calc(100% - 1px)",
          right: "100%", // ancora no lado esquerdo da 1ª linha
          backgroundColor: color,
        }}
      >
        {/* 3ª linha – horizontal, embaixo da 2ª, para a ESQUERDA */}
        <span
          className="absolute h-px"
          style={{
            width: preliminarDupla ? `280px` : "12px",
            top: "calc(100% - 1px)",
            right: "calc(100% - 1px)",
            backgroundColor: color,
          }}
        />
      </span>
    </span>
  );
};

export default ReversedBracketLine;
