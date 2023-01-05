const fs = require("fs");

const remove = (req, res) => {
  const fileName = req.params.name;
  console.log(fileName);
  const directoryPath = __basedir + "/public/caetgory/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
        return  res.status(500).send({
        message: err.message,
      });
    }

    return res.status(200).send({
      message: "File is deleted.",
    });
  });
};

const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/public/caetgory/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    return res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    return res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};

module.exports = {
  remove,
  removeSync,
};