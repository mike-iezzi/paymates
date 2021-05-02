const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// //middleware
app.use(cors());
app.use(express.json()); //req.body


//create a todo
app.post("/deal", async (req, res) => {
  try {
    const params = req.body;
    console.log(params)
    console.log(params.description)

    const new_deal = await pool.query(
      "INSERT INTO deals (description, owner_user_id, amount, method) VALUES($1, $2, $3, $4)",
      [params.description, params.owner_user_id, params.amount, params.method]
    );
    console.log(new_deal.rows[0])

    res.json(new_deal.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



app.listen(5000, () => {
  console.log("server has started on port 5000");
});

app.get("/", async (req, res) => {
      res.send("ayooo0000000000");
  });