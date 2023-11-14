import { StylesConfig } from 'react-select';

const gray200 = 'rgb(243 244 246 / 1)';
const gray300 = 'rgb(209 213 219 / 1)';
const gray400 = 'rgb(156 163 175 / 1)';
const gray500 = 'rgb(107 114 128 / 1)';
const gray600 = 'rgb(75 85 99 / 1)';
const gray700 = 'rgb(55 65 81 / 1)';
const teal200 = 'rgb(175 236 239 / 1)';
const teal400 = 'rgb(22 189 202 / 1)';
const red500 = 'rgb(240 82 82 / 1)';

const reactSelectStyleDisabledLight: StylesConfig<true> = {
  control: (styles) => ({ ...styles, 
    height: 40,
    fontSize: 14,
    lineHeight: 1.25,
    fontWeight: 500,
    boxShadow: '0 1px 2px 0 #0000',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: gray300,
    backgroundColor: 'white', 
    cursor: 'not-allowed',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: 'white',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: 'white', 
  }),
};

const reactSelectStyleDisabledDark: StylesConfig<true> = {
  control: (styles) => ({ ...styles, 
    height: 40,
    fontSize: 14,
    lineHeight: 1.25,
    fontWeight: 500,
    boxShadow: '0 1px 2px 0 #0000',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: gray500,
    backgroundColor: gray700, 
    cursor: 'not-allowed',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'white'
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: gray700,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: gray700, 
  }),
};

const reactSelectStyleLight: StylesConfig<true> = {
  control: (styles, { isFocused }) => ({ ...styles, 
    height: 40,
    fontSize: 14,
    lineHeight: 1.25,
    fontWeight: 500,
    boxShadow: '0 1px 2px 0 #0000',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: isFocused ? teal400 : gray300,
    ':hover': {
      borderColor: isFocused ? teal400 : gray300,
    },
    backgroundColor: 'white', 
  }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor:
       isFocused
        ? teal400
        : 'white'
        ? isDisabled
          ? gray200
          : 'white'
          : 'white',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      color: 
        isDisabled 
          ? gray400 
          : isFocused 
            ? 'white' 
            : gray700,
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: 'white',
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: gray700,
    backgroundColor: teal200,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: teal200,
    color: gray700,
    ':hover': {
      backgroundColor: red500,
      color: 'white',
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: 'white',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: gray500,
    ':hover': {
      color: gray700,
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: gray500, 
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: gray500,
    ':hover': {
      color: gray700,
    },
  }),
  input: (styles) => ({
    ...styles,
    color: gray700
  }),
  placeholder: (styles) => ({
    ...styles,
    color: gray700
  }),
};

const reactSelectStyleDark: StylesConfig<true> = {
  control: (styles, { isDisabled, isFocused }) => ({ ...styles, 
    height: 40,
    fontSize: 14,
    lineHeight: 1.25,
    fontWeight: 500,
    boxShadow: '0 1px 2px 0 #0000',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: isFocused ? teal400 : gray500,
    ':hover': {
      borderColor: isFocused ? teal400 : gray500,
    },
    backgroundColor: gray700, 
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor:
       isFocused
        ? teal400
        : gray700
        ? isDisabled
        ? gray600
        : gray700
        : gray700,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      color: isDisabled ? gray400 : 'white',
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: gray700,
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
    backgroundColor: gray500,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: gray500,
    color: 'white',
    ':hover': {
      backgroundColor: red500,
      color: 'white',
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  }),
  menuList: (styles) => ({
    ...styles,
    backgroundColor: gray700,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: gray500,
    ':hover': {
      color: 'white',
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: gray500, 
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: gray500,
    ':hover': {
      color: 'white',
    },
  }),
  input: (styles) => ({
    ...styles,
    color: 'white'
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'white'
  }),
};

export { reactSelectStyleDark, reactSelectStyleDisabledDark, reactSelectStyleDisabledLight, reactSelectStyleLight };

