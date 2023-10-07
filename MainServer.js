const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// Require Admin Functions

const {
  GetAdmissionUserList,
  CreateUser,
  GetCreatedUsersList,
  UpdateCreatedUsers,
  GetUserConact,
  RegisterCourse,
  GetCourses,
  AssignTeacher,
  EnrolledStudent,
} = require("./AdminFunc");

const { GETSoftwareHouseRecord } = require("./HRFunc");

const Server = express();

Server.use(cors());
Server.use(bodyParser.json());

let ConnetionFunc = () => {
  // const url = `mongodb+srv://bvllogicdatabase:Pistechs0315@cluster0.zumzos5.mongodb.net/`;
  const url = `mongodb+srv://fa7711598:TmFPz2TXM245y05V@cluster0.lfllmmh.mongodb.net/`;
  const client = new MongoClient(url);
  return client;
};

let LoginFunc = async (obj) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("RegisterdSalesPersons");
  let result = await database
    .find({ username: obj.username, password: obj.password })
    .toArray((err, res) => {
      if (err) throw err;
      return res;
    });

  return result;
};

let StudentSlipCheck = async (obj) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("StudentSlip");
  let result = await database
    .find({ Student_ID: obj.Student_ID })
    .toArray((err, res) => {
      if (err) throw err;
      return res;
    });
  return result;
};

let AdmissionCheck = async (obj) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("AdmissionStudent");
  let result = await database
    .find({ Student_ID: obj.Student_ID })
    .toArray((err, res) => {
      if (err) throw err;
      return res;
    });
  return result;
};

let RegisterQuery = async (obj) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("RegisterQuery");
  let result = await database.insertOne(obj, (err) => {
    if (err) throw err;
    return { mes: "data inserted success" };
  });

  return result;
};

let AdmissionStudent = async (obj) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("AdmissionStudent");
  let result = await database.insertOne(obj, (err) => {
    if (err) throw err;
    return { mes: "data inserted success" };
  });

  return result;
};

let GetQuery = async () => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("RegisterQuery");
  let result = await database.find({}).toArray(async (err, res) => {
    if (err) throw err;
    console.log(res);
    return res;
  });
  return result;
};

let GetAdmissionDataByID = async (obj) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("AdmissionStudent");
  let result = await database
    .find({ Student_ID: obj.Student_ID })
    .toArray((err, res) => {
      if (err) throw err;
      return res;
    });
  return result;
};

let GETExpensesData = async (obj) => {
  // console.log(obj);
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("RegisterdRecord");
  let result = await database.find({ Type: obj.Type }).toArray((err, res) => {
    if (err) throw err;
    return res;
  });
  return result;
};

let AddStudentSlip = async (obj) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("StudentSlip");
  let result = await database.insertOne(obj, (err) => {
    if (err) throw err;
    return { mes: "data inserted success" };
  });
  return result;
};

let AddRecord = async (obj) => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("RegisterdRecord");
  let result = await database.insertOne(obj, (err) => {
    if (err) throw err;
    return { mes: "Record inserted success" };
  });
  return result;
};

let GETSalesData = async () => {
  let client = ConnetionFunc();
  let res = await client.connect();
  let database = res.db("SalesDept").collection("StudentSlip");
  let result = await database.find({}).toArray(async (err, res) => {
    if (err) throw err;
    console.log(res);
    return res;
  });
  return result;
};

Server.post("/QueryRegister", async (req, resp) => {
  let data = { ...req.body };
  let result = await Promise.resolve(RegisterQuery(data)).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/AdmissionStudent", async (req, resp) => {
  let data = { ...req.body };
  let result = await Promise.resolve(AdmissionStudent(data)).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.get("/QueryRegister", async (req, resp) => {
  let result = await Promise.resolve(GetQuery()).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/GetAdmissionDataByID", async (req, resp) => {
  let data = req.body;
  let result = await Promise.resolve(
    GetAdmissionDataByID({ ...req.body })
  ).then((res) => {
    return res;
  });
  // console.log(result);
  resp.send(result);
});

Server.post("/AddStudentSlip", async (req, resp) => {
  let data = { ...req.body };
  let result = await Promise.resolve(AddStudentSlip(data)).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/AddRecord", async (req, resp) => {
  let data = req.body;
  let result = await Promise.resolve(AddRecord({ ...data })).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.get("/GETSalesData", async (req, resp) => {
  let result = await Promise.resolve(GETSalesData()).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/GETExpensesData", async (req, resp) => {
  let obj = { recieved: "true", ...req.body };
  let result = await Promise.resolve(GETExpensesData(obj)).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/GETExpensesData", async (req, resp) => {
  let obj = { recieved: "true", ...req.body };
  let result = await Promise.resolve(GETExpensesData(obj)).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/AdmissionCheck", async (req, resp) => {
  let data = req.body;
  let result = await Promise.resolve(AdmissionCheck({ ...data })).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

Server.post("/StudentSlipCheck", async (req, resp) => {
  let data = req.body;
  let result = await Promise.resolve(StudentSlipCheck({ ...data })).then(
    (res) => {
      return res;
    }
  );
  resp.json(result);
});

Server.post("/Login", async (req, resp) => {
  let data = req.body;
  let result = await Promise.resolve(LoginFunc({ ...data })).then((res) => {
    return res;
  });
  resp.json(result);
});

//AcademyLogin

let LoginFunction = async (obj) => {
  let module = obj.module;
  let data = obj.OBJ;

  let client = ConnetionFunc();
  let res = await client.connect();

  let databaseCollection;

  switch (module) {
    case "finance":
      databaseCollection = res
        .db("SalesDept")
        .collection("RegisterdSalesPersons");
      break;
    case "student":
      databaseCollection = res.db("StudentDB").collection("RegisterdStudents");
      break;
    case "teacher":
      databaseCollection = res.db("TeachersDB").collection("RegisterdTeachers");
      break;
    case "admin":
      databaseCollection = res.db("AdminDB").collection("RegisterdAdmin");
      break;
    case "hr":
      databaseCollection = res.db("HRDB").collection("RegisterdHRPersons");
      break;
    case "recovery":
      databaseCollection = res
        .db("RecoveryDB")
        .collection("RegisterdRecoverPersons");
      break;
    default:
      console.log("case not found");
  }

  let result = await databaseCollection
    .find({ username: data.username, password: data.password })
    .toArray((err, res) => {
      if (err) throw err;
      return res;
    });

  return result;
};

Server.post("/AcademyLogin", async (req, resp) => {
  let data = { ...req.body, mes: "recieved" };
  let result = await Promise.resolve(LoginFunction({ ...data })).then((res) => {
    return res;
  });
  resp.json(result);
});

//Admin Function

Server.post("/GetAdmissionUserList", async (req, resp) => {
  let UserType = req.body.UserType;
  let result = await Promise.resolve(
    GetAdmissionUserList(ConnetionFunc, UserType)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/createUser", async (req, resp) => {
  let result = await Promise.resolve(
    CreateUser(ConnetionFunc, { ...req.body })
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/GetCreatedUsersList", async (req, resp) => {
  let UserType = req.body.UserType;
  let result = await Promise.resolve(
    GetCreatedUsersList(ConnetionFunc, UserType)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/UpdateCreatedUsers", async (req, resp) => {
  let UserType = req.body.UserType;
  let Username = req.body.Username;
  let Status = req.body.Status;

  let result = await Promise.resolve(
    UpdateCreatedUsers(ConnetionFunc, UserType, Username, Status)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.get("/GetUserConact", async (req, resp) => {
  let result = await Promise.resolve(GetUserConact(ConnetionFunc)).then(
    (res) => {
      return res;
    }
  );
  console.log(result);
  resp.json(result);
});

Server.post("/RegisterCourse", async (req, resp) => {
  let result = await Promise.resolve(
    RegisterCourse(ConnetionFunc, { ...req.body })
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/AssignTeacher", async (req, resp) => {
  let result = await Promise.resolve(
    AssignTeacher(ConnetionFunc, { ...req.body })
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.post("/EnrolledStudent", async (req, resp) => {
  let result = await Promise.resolve(
    EnrolledStudent(ConnetionFunc, { ...req.body })
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.get("/GetCourses", async (req, resp) => {
  let result = await Promise.resolve(GetCourses(ConnetionFunc)).then((res) => {
    return res;
  });
  resp.json(result);
});

//HR Functions

Server.get("/GETSoftwareHouseRecord", async (req, resp) => {
  let result = await Promise.resolve(
    GETSoftwareHouseRecord(ConnetionFunc)
  ).then((res) => {
    return res;
  });
  resp.json(result);
});

Server.get("/server", (req, resp) => {
  resp.send("server connected success");
});

Server.listen(process.env.PORT || 8080, () => {
  console.log("Started");
});

module.exports = { ConnetionFunc };
