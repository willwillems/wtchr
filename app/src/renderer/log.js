import getenv from 'get-env';
const env = getenv(['docker', 'test']);

const error = function (error) {
  if (env === 'prod') {
    alert(`Something went wrong: ${error}`);
  } else {
    console.log(error);
  };
};

export default {error};
