const path = require("path");
const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {  //In which folder save the file. Null refers to NO Error
        cb(null, './uploads') 
    }, 
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false})); //Middleware

app.get("/", (req, res)=>{
    return res.render("homepage");
})

app.post("/upload", upload.fields([{name:"profileImage"}]) , (req,res)=>{
//app.post("/upload", upload.single("profileImage") , (req,res)=>{
    console.log(req.body)
    console.log(req.file)

    return res.redirect("/");
})

app.listen(PORT, ()=> console.log(`Server started at PORT: ${PORT}`));