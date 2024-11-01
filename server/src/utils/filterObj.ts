type FilteredObject<T> = {
  [K in keyof T]?: T[K];
};

const filterObj = <T extends object>(
  obj: T,
  ...allowedFields: (keyof T)[]
): FilteredObject<T> => {
  const newObj: FilteredObject<T> = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el as keyof T)) {
      newObj[el as keyof T] = obj[el as keyof T];
    }
  });
  return newObj;
};

export default filterObj;
