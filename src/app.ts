import * as express from "express";
import logger from "morgan";
import routes from "./api/user/routes";

const app = express.default();

import "./configs/db";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(routes);


const PORT: string | number = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));