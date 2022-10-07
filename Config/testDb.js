const sq = require("./db.js")
const colors = require("colors")


exports.testDb = async () => {
    try{
        sq.authenticate()
        sq.sync(
//            {force : true}
        )
        console.log(`Db connected succesfully`.green)
    }catch(err){
        console.log(`Db connection error`.red)
    }
}
