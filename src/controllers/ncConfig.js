import nc from "next-connect";
import bodyParser from "body-parser";

const baseHandler = nc();

baseHandler.use(bodyParser.json());
baseHandler.use(bodyParser.urlencoded({ extended: true }));

export default baseHandler;
