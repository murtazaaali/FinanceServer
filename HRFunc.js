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

let RegisterContract = async (connection, obj) => {
  let client = connection();
  let res = await client.connect();
  let database = await res.db("HRDB").collection("SoftwareHousesRecord");

  let existingUser = await database.findOne({
    Name: obj.Name,
    StartDate: obj.StartDate,
  });
  if (existingUser) {
    return { message: "Contract is already registered." };
  } else {
    try {
      const result = await database.insertOne(obj);
      return { message: "Contract Registerd Successfuly." };
    } catch (err) {
      return { message: "Error ..." };
    }
  }
};

module.exports = { GETSoftwareHouseRecord, RegisterContract };
