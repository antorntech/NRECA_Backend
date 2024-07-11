const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Accounts = require("../models/Accounts");

const JWT_SECRET_KEY = "secret123";

module.exports.createAccounts = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    console.log(req.body);
    const emailPattern = /^[\w-]+(\.[\w-]+)*@nreca-intl\.org$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email address",
      });
    } else {
      const existingUserName = await Accounts.findOne({ username });
      if (existingUserName) {
        return res
          .status(409)
          .json({ message: "Accounts with this username already exists" });
      } else {
        const existingAccounts = await Accounts.findOne({ email });
        if (existingAccounts) {
          return res
            .status(409)
            .json({ message: "Accounts with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new account in the database
        const newAccounts = await Accounts.create({
          username,
          email,
          password: hashedPassword,
          role,
        });

        const token = jwt.sign(
          { email: newAccounts.email, id: newAccounts._id },
          JWT_SECRET_KEY
        );
        return res.status(201).json({
          message: "Accounts created successfully",
          account: newAccounts,
          token,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.accountsLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the account by email
    const account = await Accounts.findOne({ email });

    // If the account is not found
    if (!account) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, account.password);

    // If the password is invalid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ accountId: account._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const newaccount = {
      email: account.email,
      role: account.role,
    };

    // Return the token to the client
    return res
      .status(200)
      .json({ message: "Login successful", newaccount, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.getAccounts = async (req, res) => {
  try {
    const result = await Accounts.find({
      role: {
        $ne: "superadmin",
      },
    });

    return res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.getSingleAccounts = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Accounts.findById({ _id: id });
    return res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.updatedAccounts = async (req, res) => {
  try {
    const { accountsId } = req.params;
    const { username, email, password, role } = req.body;

    // Check if the account with the given ID exists
    const accountToUpdate = await Accounts.findById({ _id: accountsId });

    if (!accountToUpdate) {
      return res.status(404).json({ message: "Accounts not found" });
    }

    // Hash the new password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update account's details
    accountToUpdate.username = username || accountToUpdate.username;
    accountToUpdate.email = email || accountToUpdate.email;
    accountToUpdate.password = hashedPassword || accountToUpdate.password;
    accountToUpdate.role = role || accountToUpdate.role;

    await accountToUpdate.save();

    return res.status(200).json({
      message: "Accounts updated successfully",
      account: accountToUpdate,
    });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports.deleteAccounts = async (req, res) => {
  try {
    const { accountsId } = req.params;
    const deletedAccounts = await Accounts.findByIdAndDelete(accountsId);

    return res.json(deletedAccounts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
