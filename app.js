var filewatcher = require('filewatcher');
const ora = require('ora'); //ANIMATION !!!!!
var fs = require('fs-extra');
var path = require('path');
var cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}

if (cluster.isWorker) {
 	var watcher = filewatcher();

const config = {
  sap_out_dir: '',
  db_out_dir: '',
  sap_in_dir: '',
  db_in_dir: ''
}

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

watcher.on('change', function (file, stat) {

	fs.readdir(config.sap_out_dir, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      try {
	var is = fs.createReadStream(oldPath+'\\'+file);
	var os = fs.createWriteStream(newPath+'\\'+file);

	is.pipe(os);
	is.on('end',function() {
    		fs.unlinkSync(oldPath+'\\'+file);
	});
        console.log("Successfully moved the file!")
      } catch (err) {
        throw err
      }
    });
  });  	
});
}





