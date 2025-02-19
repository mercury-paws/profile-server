export const emailRegexp = /[-.\w]+@([\w-]+\.)+[\w-]+/;
export const stringRegexp = /^[^<>/\\;'"(){}|&]+$/;

export const validateEmail = {
  validator: function (v) {
    return emailRegexp.test(v);
  },
  message: (props) => `${props.value} is not a valid email!`,
};

export const validateString = {
  validator: function (v) {
    return stringRegexp.test(v);
  },
  message: (props) => `${props.value} is not a valid text!`,
};