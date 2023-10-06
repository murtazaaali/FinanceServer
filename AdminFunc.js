let GetAdmissionUserList = async (connection, UserType) => {
  let client = connection();
  let res = await client.connect();
  let database;
  let field;
  if (UserType === "Student") {
    database = await res.db("SalesDept").collection("AdmissionStudent");
    field = [
      {
        $project: {
          Student_ID: 1,
          AppliedCourse: 1,
          StudentName: 1,
          _id: 0,
        },
      },
    ];
  } else {
    database = await res.db("HRDB").collection("RegisterTeacher");
    field = [
      {
        $project: {
          Teacher_ID: 1,
          TeachCourse: 1,
          TeacherName: 1,
          _id: 0,
        },
      },
    ];
  }
  let result = await database.aggregate(field).toArray(async (err, res) => {
    if (err) throw err;
    console.log(res);
    return res;
  });
  return result;
};

let CreateUser = async (connection, obj) => {
  let UserData = obj.obj;
  let client = connection();
  let res = await client.connect();
  let database;
  if (obj.user === "Student") {
    database = await res.db("StudentDB").collection("RegisterdStudents");
  } else {
    database = await res.db("TeachersDB").collection("RegisterdTeachers");
  }
  let existingUser = await database.findOne({ username: UserData.username });
  if (existingUser) {
    return { message: "Username is already registered." };
  } else {
    try {
      const result = await database.insertOne(UserData);
      return { message: "User registration successful." };
    } catch (err) {
      return { message: "Error inserting data." };
    }
  }
};

let GetCreatedUsersList = async (connection, UserType) => {
  let client = connection();
  let res = await client.connect();
  let database;
  let field = [
    {
      $project: {
        username: 1,
        Status: 1,
        Name: 1,
        _id: 0,
      },
    },
  ];
  if (UserType === "Student") {
    database = await res.db("StudentDB").collection("RegisterdStudents");
  } else {
    database = await res.db("TeachersDB").collection("RegisterdTeachers");
  }
  let result = await database.aggregate(field).toArray(async (err, res) => {
    if (err) throw err;
    console.log(res);
    return res;
  });
  return result;
};

let UpdateCreatedUsers = async (
  connection,
  UserType,
  Username,
  updatedStatus
) => {
  let client = connection();
  let res = await client.connect();
  let database;
  if (UserType === "Student") {
    database = await res.db("StudentDB").collection("RegisterdStudents");
  } else {
    database = await res.db("TeachersDB").collection("RegisterdTeachers");
  }
  let result = await database.updateOne(
    { username: Username },
    { $set: { Status: updatedStatus } }
  );
  return { message: "User Status Successfuly Updated." };
};

let GetUserConact = async (connection) => {
  let client = connection();
  let res = await client.connect();
  let database;
  let field;

  database = await res.db("HRDB").collection("RegisterTeacher");
  field = [
    {
      $project: {
        TeachCourse: 1,
        TeacherName: 1,
        Email: 1,
        Designation: 1,
        Contact: 1,
        Teacher_ID: 1,
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

module.exports = {
  GetAdmissionUserList,
  CreateUser,
  GetCreatedUsersList,
  UpdateCreatedUsers,
  GetUserConact,
};
