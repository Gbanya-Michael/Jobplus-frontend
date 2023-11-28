export const parseErrors = (error) => {
  if (error?.response?.data?.error?.name === "ValidationError") {
    return {
      message: error.response.data.error.message,
      details: error.response.data.error.details.errors,
    };
  }

  if (error?.message === "NetworkError") {
    return {
      message: "unable to connect to server end point",
      details: [],
    };
  }
  if (error?.response?.status === 403) {
    return {
      message: "You do not have access",
      details: [],
    };
  }

  return {
    message: "An error has occured",
    details: [],
  };
};
