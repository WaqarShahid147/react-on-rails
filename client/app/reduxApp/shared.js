export const updateArray = (immutableArray, updatedObject, index) => 
  [
    ...immutableArray.slice(0, index),
    updatedObject,
    ...immutableArray.slice(index+1),
  ]
