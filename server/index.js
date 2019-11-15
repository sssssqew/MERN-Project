const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get("/hello", (req, res)=>{
	res.send("hello mern project from server !!");
});

app.listen(PORT, ()=>{
	console.log(`server is running on port ${PORT}`);
})
