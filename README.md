# Node-Filewatcher

Filewatcher build with Node.js
Detect file change in a directory, move it to a new directory and exec sql query. <br>
(this specific flow is used by my company).

### Prerequisites
What things you need to install the software and how to install them.
```
Node.js v16.0.0 or latest
then
navigate to app folder => npm install
```
<br><br>
Change the directory that you want to watch in config (you can also change variable name).
```
const config = {
  sap_out_dir: 'your dir',
  db_out_dir: 'your dir',
  sap_in_dir: 'your dir',
  db_in_dir: 'your dir'
}
```

```
// config for your database
var dbConfig = {
  user: '',
  password: '',
  server: '',
  database: ''
};


```
<br><br>
— note for sqlserver <br>
if node.js cannot connect, add this below database variable
```
options: {
    instanceName: '',
    trustServerCertificate: true,
    encrypt: false,
  },
```
<br><br>
Excecute your query in
```
request.query('Select * from T_xxxx', function (err, recordset) {
        if (err) console.log(err)
      });
```
Or you can custom it as you like.
<br><br>
## Authors
* **Davin Kurnia** - *Developer* - [Kaiciary](https://github.com/Kaiciary)

## Acknowledgments
* Hat tip to [filewatcher by fgnass](https://www.npmjs.com/package/filewatcher)
* Hat tip to [fsExtra by jprichardson](https://github.com/jprichardson/node-fs-extra)
* Inspiration
* etc



