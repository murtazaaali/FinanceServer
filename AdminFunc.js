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
    // console.log(res);
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
    // console.log(res);
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

  database = await res.db("HRDB").collection("TeacherContact");
  field = [
    {
      $project: {
        Name: 1,
        Email: 1,
        Designation: 1,
        Contact: 1,
        _id: 0,
      },
    },
  ];

  let result = await database.aggregate(field).toArray(async (err, res) => {
    if (err) throw err;
    // console.log(res);
    return res;
  });
  return result;
};

let RegisterCourse = async (connection, obj) => {
  let client = connection();
  let res = await client.connect();
  let database = await res.db("AdminDB").collection("RegisterdCourses");

  let existingUser = await database.findOne({ CourseID: obj.CourseID });
  if (existingUser) {
    return { message: "Course is already registered." };
  } else {
    try {
      const result = await database.insertOne(obj);
      return { message: "Course Registerd Successfuly." };
    } catch (err) {
      return { message: "Error ..." };
    }
  }
};

let AddProgram = async (connection, obj) => {
  let client = connection();
  let res = await client.connect();
  let database = await res.db("AdminDB").collection("RegisteredPrograms");
  // let result = await database.updateOne(
  //   { CourseID: obj.SelectedCourse },
  //   { $set: { Teacher: obj.SelectedTeacher } }
  // );
  let existingUser = await database.findOne({
    ProgramName: obj.ProgramName,
  });
  if (existingUser) {
    return { message: "Program is already Assigned." };
  } else {
    try {
      const result = await database.insertOne(obj);
      return { message: "Program Registerd Successfuly." };
    } catch (err) {
      return { message: "Error ..." };
    }
  }
};

let AssignTeacher = async (connection, obj) => {
  let client = connection();
  let res = await client.connect();
  let database = await res.db("AdminDB").collection("RegisterdCourses");
  let result = await database.updateOne(
    { CourseID: obj.SelectedCourse },
    { $set: { Teacher: obj.SelectedTeacher } }
  );
  let existingUser = await database.findOne({
    CourseID: obj.CourseID,
    Teacher: obj.SelectedTeacher,
  });
  if (existingUser) {
    return { message: "Course is already Assigned." };
  } else {
    try {
      const result = await database.insertOne(obj);
      return { message: "Teacher Assigned Successfuly." };
    } catch (err) {
      return { message: "Error ..." };
    }
  }
};

let GetCourses = async (connection) => {
  let client = connection();
  let res = await client.connect();
  let database = res.db("AdminDB").collection("RegisterdCourses");
  let field = [
    {
      $project: {
        CourseName: 1,
        CourseID: 1,
        Teacher: 1,
        _id: 0,
      },
    },
  ];
  let result = await database.aggregate(field).toArray((err, res) => {
    if (err) throw err;
    return res;
  });
  return result;
};

let EnrolledStudent = async (connection, obj) => {
  let client = await connection();
  let res = await client.connect();
  // console.log(obj);
  let database = await res.db("AdminDB").collection("RegisterdCourses");
  const existingStudent = await database.findOne({
    studentID: obj.SelectedStudent,
  });
  if (existingStudent) {
    return { message: "Student Already Enrolled" };
  } else {
    await database.updateOne(
      { CourseID: obj.SelectedCourse },
      {
        $push: {
          Students: {
            studentName: obj.StudentName,
            studentID: obj.SelectedStudent,
          },
        },
      }
    );
    return { message: "Student Enrolled Success" };
  }
};

let GETProgramList = async (connection, UserType) => {
  let client = connection();
  let res = await client.connect();
  let database;
  let field = [
    {
      $project: {
        ProgramName: 1,
        _id: 0,
      },
    },
  ];
  database = await res.db("AdminDB").collection("RegisteredPrograms");

  let result = await database.aggregate(field).toArray(async (err, res) => {
    if (err) throw err;
    // console.log(res);
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
  RegisterCourse,
  GetCourses,
  AssignTeacher,
  EnrolledStudent,
  AddProgram,
  GETProgramList,
};
