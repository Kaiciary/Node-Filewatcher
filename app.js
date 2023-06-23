var filewatcher = require('filewatcher');
const ora = require('ora'); //ANIMATION !!!!!
var fs = require('fs-extra');
var sql = require("mssql");

var watcher = filewatcher();

const config = {
  sap_out_dir: 'C:\\MyFiles\\New folder (2)\\New folder',
  db_out_dir: 'C:\\MyFiles\\New folder (2)\\aaa',
  sap_in_dir: '',
  db_in_dir: ''
}

// config for your database
var dbConfig = {
  user: '',
  password: '',
  server: '',
  database: ''
};

var oldPath = config.sap_out_dir;
var newPath = config.db_out_dir;

// watch a file
//watcher.add(__filename);

// ... or a directory
//watcher.add(__dir);


if (fs.existsSync(config.sap_out_dir)) {
  watcher.add(config.sap_out_dir);
} else {
  console.log(config.sap_out_dir + " SAP OUT dir Path does not exist");
  process.exit();
}

if (fs.existsSync(config.db_out_dir)) {
  watcher.add(config.db_out_dir);
} else {
  console.log(config.db_out_dir + " DB OUT dir Path does not exist");
  process.exit();
}

ora('Filewatcher Running').start();

sql.connect(dbConfig, function (err) {
  if (err) {
    console.log(err);
    process.exit();
  }
});

// create Request object
var request = new sql.Request();

watcher.on('change', function (file, stat) {
  if (fs.exists(oldPath)) {
    fs.copy(oldPath, newPath).then(() => {
      // query to the database and get the records
      request.query('EXEC spReadFileXML_Cancel_GR', function (err, recordset) {
        if (err) console.log(err)
      });
      // Empty SAP out dir
      fs.emptyDir(config.sap_out_dir, err => {
        if (err) return console.error(err)
      })
    });
    // clear console
    process.stdout.write('\033c');
  }
});
