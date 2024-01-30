export const toggleTag = (selectedItems: number[], id: number, isMin: boolean) => {
  if (selectedItems.includes(id)) {
    return selectedItems.filter((item) => item !== id);
  }
  if (isMin) {
    return [...selectedItems, id]
  } else if (selectedItems.length < 2) {
    return [...selectedItems, id];
  }

  return selectedItems;
}