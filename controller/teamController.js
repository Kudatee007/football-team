const Teams = require("../model/teamModel");

const getAllTeams = async (req, res) => {
  console.log(req.query);
  const { name, location, ulcwinner, sort, select } = req.query;
  let queryObject = {};
  let result = Teams.find(queryObject);
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (location) {
    queryObject.location = { $regex: location, $options: "i" };
  }

  if (ulcwinner) {
    queryObject.ulcwinner = ulcwinner === "true" ? true : false;
  }

  //SORTING
  if (sort) {
    const sortList = sort.split(",").join(" ")
    result = result.sort(sortList)
  }

  // SELECT
  if (select) {
    const selectList = select.split(",").join(" ")
    result = result.select(selectList)
  };

  // LIMIT
  const limit = Number(req.query.limit);
  result = result.limit(limit);



  result = result.find(queryObject);
  const team = await result;
  res.status(200).json({
    success: true,
    no0fTeams: team.length,
    team,
  });[]
};

module.exports = getAllTeams;
