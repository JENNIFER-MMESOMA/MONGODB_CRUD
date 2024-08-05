const http = require("http");
const app = require("./app");
const connectDb = require("./helpers/dbConfig");
const httpServer =  http.createServer(app);
const{PORT} = require("./config/index");

const startServer = async () => {
    await connectDb();
    httpServer.listen(PORT, () =>{
        console.log(`server is running on port: ${PORT}`);
    });
};
 
startServer()