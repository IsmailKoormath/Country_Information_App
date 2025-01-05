import express, { Request, Response } from "express";
import ip from "ip";
import cors from 'cors'
import { errorHandling } from "./middlewares/error.middleware";
import countryRoute from "./routes/countryRoute";
const app = express();

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use("/api/countries", countryRoute);

app.use(errorHandling);

app.get("/", (req:Request, res:Response) => {
  res.status(201).json("Running");
});

const port = 1001;
app.listen(port, () => {
  console.log(`App listening on the port ${ip.address()}:${port}`);
});
