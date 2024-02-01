import React from 'react';

const LocalPin = ({ isHovered, ...rest }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H18V18H0V0Z" fill="white" fill-opacity="0.01" />
      <path d="M9.00098 7.5C10.6578 7.5 12.001 6.15686 12.001 4.5C12.001 2.84314 10.6578 1.5 9.00098 1.5C7.34411 1.5 6.00098 2.84314 6.00098 4.5C6.00098 6.15686 7.34411 7.5 9.00098 7.5Z" stroke="white" fill={isHovered ? '#2CBBBC' : 'null'} stroke-width="1.5" stroke-linejoin="round" />
      <path d="M9 7.5V14.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.00098 12H4.50098L1.50098 16.5H16.501L13.501 12H12.001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export default LocalPin
