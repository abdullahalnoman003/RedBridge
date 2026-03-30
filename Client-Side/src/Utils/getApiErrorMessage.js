const getApiErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  const data = error?.response?.data;

  if (typeof data?.message === 'string' && data.message.trim()) {
    return data.message;
  }

  if (Array.isArray(data?.details) && data.details.length > 0) {
    const first = data.details.find((item) => typeof item === 'string' && item.trim());
    if (first) {
      return first;
    }
  }

  if (typeof error?.message === 'string' && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

export default getApiErrorMessage;
