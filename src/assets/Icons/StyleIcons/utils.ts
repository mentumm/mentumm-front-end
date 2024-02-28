const activeColor = '#2CBBBC';
const isBgWhiteColor = '#002F6F'

// Function to determine stroke color based on props
export const getStrokeColor = ({ isBgWhite, isSelected }) => {
  if (isBgWhite) return isBgWhiteColor;
  if (isSelected) return activeColor;
  return 'white';
};

// Function to determine fill color based on props
export const getFillColor = ({ isHovered, isSelected, isSelectable }) => {
  if (isHovered && !isSelected && isSelectable) return activeColor;
  return 'none';
};