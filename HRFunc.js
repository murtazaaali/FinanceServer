let GETSoftwareHouseRecord = async (ConnetionFunc) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let field = [
    {
      $project: {
        Name: 1,
        StartDate: 1,
        EndDate: 1,
        _id: 0,
      },
    },
  ];
  let database = res.db("HRDB").collection("SoftwareHousesRecord");
  let result = await database.aggregate(field).toArray(async (err, res) => {
    if (err) throw err;
    console.log(res);
    return res;
  });
  return result;
};

module.exports = { GETSoftwareHouseRecord };
