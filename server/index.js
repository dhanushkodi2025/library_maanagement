const express = require("express");
const app = express();
const cors=require("cors")
const db = require("./models");

app.use(express.json());
app.use(cors());
const booksRouter = require('./routes/Books');
app.use("/Books", booksRouter);
const reviewsRouter = require('./routes/reviews');
app.use("/reviews", reviewsRouter);
const UsersRouter = require('./routes/Users');
app.use("/auth", UsersRouter);
const DelRouter = require('./routes/Delbook');
app.use("/",DelRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server  running");
    });
});
