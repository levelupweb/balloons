require("dotenv").config();
require("colors");
require("@babel/register");
require("./server").default(__dirname);
