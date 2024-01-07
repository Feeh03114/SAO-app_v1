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

const slate500 = 'rgb(100 116 139 / 1)';
const slate700 = 'rgb(51 65 85 / 1)';

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
    cursor: 'default',
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
    borderColor: slate500,
    backgroundColor: slate700, 
    cursor: 'default',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'white'
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: slate700,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: slate700, 
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
        : isDisabled
          ? gray200
          : 'white',
      cursor: isDisabled ? 'default' : 'pointer',
      color: 
        isDisabled 
          ? gray400 
          : isFocused 
            ? 'white' 
            : slate700,
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
    color: slate700,
    backgroundColor: teal200,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: teal200,
    color: slate700,
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
    color: slate500,
    ':hover': {
      color: slate700,
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: slate500, 
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: slate500,
    ':hover': {
      color: slate700,
    },
  }),
  input: (styles) => ({
    ...styles,
    color: slate700
  }),
  placeholder: (styles) => ({
    ...styles,
    color: slate700
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
    borderColor: isFocused ? teal400 : slate500,
    ':hover': {
      borderColor: isFocused ? teal400 : slate500,
    },
    backgroundColor: slate700, 
    cursor: isDisabled ? 'default' : 'pointer',
  }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor:
       isFocused
        ? teal400
        : slate700
        ? isDisabled
        ? gray600
        : slate700
        : slate700,
      cursor: isDisabled ? 'default' : 'pointer',
      color: isDisabled ? gray400 : 'white',
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: slate700,
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
    backgroundColor: slate500,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: slate500,
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
    backgroundColor: slate700,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: slate500,
    ':hover': {
      color: 'white',
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: slate500, 
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: slate500,
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

function reactSelectStyle(isDisabled: boolean, isDarkMode: boolean) {
  if(isDisabled) 
    if(isDarkMode) {
      return reactSelectStyleDisabledDark;
    } else {
      return reactSelectStyleDisabledLight;
    }
  else 
    if(isDarkMode) {
      return reactSelectStyleDark;
    } else {
      return reactSelectStyleLight;
    }
}

export { reactSelectStyle };

