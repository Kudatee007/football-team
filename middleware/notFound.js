const notFound = (req, res) => {
  res.status(400).send(`Route not found try <a href = '/api/v1/teams'>FOOTBAL API</a>`);
};

module.exports = notFound;
