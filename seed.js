const model = require('./model');

model.db.sync({force: true})
.then(() => {console.log("Success!")})
.then(model.insertRows)
.catch((e) => {console.log(e)})
.finally(() => { model.db.close() });
