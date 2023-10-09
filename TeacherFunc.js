const GETTeacherClass = async (ConnetionFunc, obj) => {
  let client = ConnetionFunc();
  try {
    await client.connect();
    let database = client.db("AdminDB").collection("RegisterdCourses");
    let result = await database
      .find({ Teacher: obj.TeacherID })
      .project({
        CourseName: 1,
        CourseID: 1,
        _id: 0,
      })
      .toArray();
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.close();
  }
};

const GETCourseStudents = async (ConnetionFunc, obj) => {
  let client = ConnetionFunc();
  try {
    await client.connect();
    let database = client.db("AdminDB").collection("RegisterdCourses");
    let result = await database
      .find({ Teacher: obj.TeacherID, CourseID: obj.CourseID })
      .project({
        CourseName: 1,
        CourseID: 1,
        Students: 1,
        _id: 0,
      })
      .toArray();
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.close();
  }
};

const AddAttandance = async (ConnetionFunc, obj) => {
  let client = ConnetionFunc();
  // try {
  await client.connect();
  let database = client.db("AdminDB").collection("RegisterdCourses");

  try {
    const result = await database.updateOne(
      { CourseID: obj.CourseID },
      { $push: { Attandance: obj.Attandancedata } }
    );

    if (result.modifiedCount === 1) {
      //   console.log(`Attendance added to the document with CourseID:`);
      return { message: "Attandance Added" };
    } else {
      //   console.log(`Document with CourseID:  not found.`);
      return { message: "Issue Occour" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
  } finally {
    // Close the MongoDB connection
    client.close();
  }
};

const AddMarks = async (ConnetionFunc, obj) => {
  let client = ConnetionFunc();
  // try {
  await client.connect();
  let database = client.db("AdminDB").collection("RegisterdCourses");

  try {
    const result = await database.updateOne(
      { CourseID: obj.CourseID },
      { $push: { Marks: obj.Marks } }
    );

    if (result.modifiedCount === 1) {
      return { message: "Marks Added" };
    } else {
      return { message: "Issue Occour" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
  } finally {
    client.close();
  }
};

module.exports = {
  GETTeacherClass,
  GETCourseStudents,
  AddAttandance,
  AddMarks,
};
