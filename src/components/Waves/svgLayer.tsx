import React, { CSSProperties } from 'react';

export const SvgLayer = ({ children, vbHeight, ...props }) => {
  // Default styles for the Wave SVG
  const defaultStyle: CSSProperties = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100vw',
    height: 'auto',
  };

  return (
    <svg
      viewBox={`0 0 1440 ${vbHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      style={defaultStyle}
      {...props}
    >
      {children}
    </svg>
  );
};
