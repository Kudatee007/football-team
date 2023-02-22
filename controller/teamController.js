const Teams = require("../model/teamModel");

const getAllTeams = async (req, res) => {
  console.log(req.query);
  const { name, location, ulcwinner, sort, select, numberFilters } = req.query;
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
  if (numberFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    // rejex for mathematical comparison/conversion
    const regEx = /\b(<|>|>=|<=|=)\b/g;

    let filters = numberFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["rating"];
    filters = filters.split(",").forEach((item) => {
      const [search, operator, value] = item.split("-");
      if (options.includes(search)) {
        queryObject[search] = { [operator]: Number(value)};  
      }
    });
  }
  //SORTING
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }

  // SELECT
  if (select) {
    const selectList = select.split(",").join(" ");
    result = result.select(selectList);
  }

  // LIMIT
  const limit = Number(req.query.limit);
  result = result.limit(limit);

  result = result.find(queryObject);
  const team = await result;
  res.status(200).json({
    success: true,
    no0fTeams: team.length,
    team,
  });
  [];
};

module.exports = getAllTeams;
