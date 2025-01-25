export const emailRegexp = /[-.\w]+@([\w-]+\.)+[\w-]+/;

export const validateEmail = {
  validator: function (v) {
    return emailRegexp.test(v);
  },
  message: (props) => `${props.value} is not a valid email!`,
};