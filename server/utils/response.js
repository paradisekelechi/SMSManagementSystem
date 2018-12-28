export const plainResponse = (req, res, status, message, success) => {
  const responseObject = {
    message,
    success,
  };
  res.status(status).send(responseObject);
};

export const payloadResponse = (req, res, status, message, success, payload, payloadName) => {
  const responseObject = {
    message,
    success,
  };
  responseObject[payloadName] = payload;
  res.status(status).send(responseObject);
};
