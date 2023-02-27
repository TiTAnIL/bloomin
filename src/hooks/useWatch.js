import { useEffectUpdate } from "./useEffectUpdate";
import { useState } from 'react';

export const useWatch = (field, callback) => {
  const [fields, setFields] = useState({});

  useEffectUpdate(() => {
    if (callback && fields.hasOwnProperty(field)) {
      callback(fields[field]);
    }
  }, [fields[field]]);

  const watch = (fieldName) => {
    setFields((prevFields) => ({ ...prevFields, [fieldName]: fields[fieldName] }));
  };

  return watch;
};
