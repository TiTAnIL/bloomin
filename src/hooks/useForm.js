import { useEffect, useState } from 'react'

export const useForm = (initialState, callBack) => {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    if (callBack) callBack(fields)
  }, [fields])

  const MAX_CHARS_PER_LINE = 100;

  const handleChange = ({ target }) => {
    const field = target.name;
    let value = target.type === 'number' ? +target.value || '' : target.value;
  
    // split the value into an array of substrings with a maximum length of MAX_CHARS_PER_LINE
    const substrings = value.match(new RegExp(`.{1,${MAX_CHARS_PER_LINE}}`, 'g'));
  
    // join the substrings with a newline character
    value = substrings.join('\n');
  
    setFields((prevFields) => ({ ...prevFields, [field]: value }));
  }
  

  return [fields, handleChange, setFields]
}
