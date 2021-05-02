const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); 


// create a deal 
app.post("/deal", async (req, res) => {
  try {
    const params = req.body;
    console.log(params)

    const new_deal = await pool.query(
      `INSERT INTO deals 
      (description, owner_user_id, amount, method) 
      VALUES($1, $2, $3, $4) RETURNING *`,
      [params.description, params.owner_user_id, params.amount, params.method]
    );
    console.log(new_deal.rows[0])

    res.json(new_deal.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get details of a deal 
app.get("/deal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const todo = await pool.query("SELECT * FROM deals WHERE deal_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update details of a deal 
app.put("/deal/:id", async (req, res) => {
  try {
    const params = req.body;
    console.log(params)

    const new_deal = await pool.query(
      `INSERT INTO deals 
      (description, owner_user_id, amount, method) 
      VALUES($1, $2, $3, $4) RETURNING *`,
      [params.description, params.owner_user_id, params.amount, params.method]
    );
    console.log(new_deal.rows[0])

    res.json(new_deal.rows[0]);
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