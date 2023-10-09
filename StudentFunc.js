const GETStudentClass = async (ConnetionFunc, obj) => {
  let client = ConnetionFunc();
  // try {
  await client.connect();
  let database = client.db("AdminDB").collection("RegisterdCourses");

  try {
    const courses = await database
      .find({
        Students: {
          $elemMatch: { studentID: obj.StudentID },
        },
      })
      .project({
        CourseName: 1,
        CourseID: 1,
        _id: 0,
      })
      .toArray();

    return courses;
  } catch (error) {
    console.error("Error querying documents:", error);
  } finally {
    client.close();
  }
};

const GETStudentAttandance = async (connectionFunc, obj) => {
  const client = connectionFunc();

  await client.connect();
  const database = client.db("AdminDB").collection("RegisterdCourses");

  const query = {
    CourseID: obj.CourseID,
  };

  const projection = {
    _id: 0,
  };

  const result = await database.findOne(query, projection);

  if (result) {
    const attendanceData = result.Attandance.map((attendance) => ({
      [obj.StudentID]: attendance[obj.StudentID],
    }));
    let res = result.Attandance;
    return res;
  }
};

const GETStudentMarks = async (connectionFunc, obj) => {
  const client = connectionFunc();

  await client.connect();
  const database = client.db("AdminDB").collection("RegisterdCourses");

  const query = {
    CourseID: obj.CourseID,
  };

  const projection = {
    _id: 0,
    CourseName: 1,
    // Exclude _id field from the result
  };

  const result = await database.findOne(query, projection);

  if (result) {
    const attendanceData = result.Attandance.map((ele) => ({
      [obj.StudentID]: ele[obj.StudentID],
    }));
    let res = result.Marks;
    return res;
  }
};

module.exports = { GETStudentClass, GETStudentMarks, GETStudentAttandance };
