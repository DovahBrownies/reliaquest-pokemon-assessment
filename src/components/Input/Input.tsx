import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './Input.styles';

interface InputProps {
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  inputDebounce?: number;
}

const Input = ({ label, placeholder, onChange, inputDebounce = 0 }: InputProps) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  useEffect(() => {
      const handler = setTimeout(() => {
      onChange(value);
    }, inputDebounce);

    return () => clearTimeout(handler);
  }, [value, inputDebounce, onChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      {label && <span className={classes.label}>{label}</span>}
      <input
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

const useStyles = createUseStyles(
  styles,
  { name: 'InputComponent' }
);

export default Input;