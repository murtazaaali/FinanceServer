let GetAdmissionUserList = async (connection, UserType) => {
  let client = connection();
  let res = await client.connect();
  let database;
  if (UserType === "Student") {
    await res.db("SalesDept").collection("AdmissionStudent");
  } else {
    await res.db("HRDB").collection("RegisterTeacher");
  }

  const field = [
    {
      $project: {
        Student_ID: 1,
        AppliedCourse: 1,
        StudentName: 1,
        _id: 0,
      },
    },
  ];
  let result = await database.aggregate(field).toArray(async (err, res) => {
    if (err) throw err;
    console.log(res);
    return res;
  });
  return result;
};

let CreateUser = async (connection, obj) => {
  let client = connection();
  let res = await client.connect();
  let database = res.db("StudentDB").collection("RegisterdStudents");
  //   let result = await database.insertOne(obj, (err) => {
  //     if (err) throw err;
  //     return { mes: "data inserted success" };
  //   });
  let existingUser = await database.findOne({ username: obj.username });

  if (existingUser) {
    return { message: "Username is already registered." };
  } else {
    try {
      const result = await database.insertOne(obj);
      return { message: "User registration successful." };
    } catch (err) {
      return { message: "Error inserting data." };
    }
  }
  return result;
};

module.exports = { GetAdmissionUserList, CreateUser };
