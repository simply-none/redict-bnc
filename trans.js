let fs = require("fs");
require("colors");

let rawDataq = [];

let rawDataDir = "./download/Texts";

if (!fs.existsSync(rawDataDir)) {
  return false;
}

let files = fs.readdirSync(rawDataDir);
for (let i = 0; i < files.length; i++) {
  const fileName = files[i];

  rawDataq.push(rawDataDir + "/" + fileName + "/");
}

for (let dir of rawDataq) {
  if (fs.existsSync(dir)) {
    let files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
      let fileName = files[i];

      let newDirname = (dir + fileName).split("/");
      newDirname.splice(1, 1, "newData");
      newDirname = newDirname.join("/");

      let dirname = require("path").dirname(newDirname + fileName);

      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
      }

      var convert = require("xml-js");
      var xml = fs.readFileSync(dir + fileName, "utf8");
      var options = { ignoreComment: true, alwaysChildren: true };
      var result = convert.xml2js(xml, options); // or convert.xml2json(xml, options)

      fileName = fileName.replace(".xml", ".json");

      fs.writeFile(dirname + "/" + fileName, JSON.stringify(result), (err) => {
        if (err) {
          console.log(err);
        }
        console.log(dirname + "/" + fileName + ": 读取成功！");
      });
    }
  }
}
