const Employee = require("../models/Employee");

module.exports.allEmployee = async (req, res) => {
  try {
    const users = await Employee.find();
    users.sort((a, b) => a.officeId - b.officeId);
    res.status(200).json(users);
  } catch (error) {
    console.log(error, "Error");
    res.send("Inter Server Error");
  }
};

module.exports.singleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employee.findOne({ _id: id });

    res.status(200).json({
      status: "success",
      message: "Data find successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data not find",
      error: error,
    });
  }
};

module.exports.addEmployee = async (req, res, next) => {
  try {
    const getEmail = req.body.officeEmail;
    const getOfficeId = req.body.officeId;

    const emailPattern = /^[\w-]+(\.[\w-]+)*@nreca-intl\.org$/;
    if (!emailPattern.test(getEmail)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email address",
      });
    } else {
      const existingOfficeId = await Employee.findOne({
        officeId: getOfficeId,
      });

      const existingEmail = await Employee.findOne({
        officeEmail: getEmail,
      });

      if (existingOfficeId) {
        return res.status(400).json({
          status: "fail",
          message: "Office Id already exists",
        });
      } else if (existingEmail) {
        return res.status(400).json({
          status: "fail",
          message: "Email already exists",
        });
      } else {
        // Get the filenames of the uploaded files
        const avatar = req.files["avatar"][0].filename;
        const nidDoc = req.files["nidDoc"][0].filename;
        const passportDoc = req.files["passportDoc"][0].filename;
        const tinDoc = req.files["tinDoc"][0].filename;
        const signatureDoc = req.files["signatureDoc"][0].filename;

        // Assign the filenames to the user object
        req.body.avatar = `/uploads/images/${avatar}`;
        req.body.nidDoc = `/uploads/documents/${nidDoc}`;
        req.body.passportDoc = `/uploads/documents/${passportDoc}`;
        req.body.tinDoc = `/uploads/documents/${tinDoc}`;
        req.body.signatureDoc = `/uploads/images/${signatureDoc}`;

        const result = await Employee.create(req.body);

        return res.status(201).json({
          status: "success",
          message: "Employee created successfully!",
          data: result,
        });
      }
    }
  } catch (error) {
    console.log(error, "Error");
    res.status(400).send(error);
  }
};

module.exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if files were uploaded
    if (req.file) {
      Object.assign(req.body, {
        avatar: "/uploads/images/" + req.file.filename,
      });
    }

    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: employee,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    return res.json(deletedEmployee);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
