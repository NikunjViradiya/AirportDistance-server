const express = require("express");
const cors = require("cors");
const { airport } = require("./data");
const app = express();
app.use(cors());
require("dotenv").config();

app.use("/:key", (req, res) => {
	try {
		const key = req.params.key;
		if (!req.params.key || req.params.key.length < 1) return res.status.send([]);
		let data = airport.filter((item) => item.name.includes(key) || item.iata.includes(key));
		return res.status(200).send({
			data: data.slice(0, 40),
		});
	} catch (err) {
		return res.send({ data: [] });
	}
});

app.listen(process.env.PORT, () => {
	console.log("server running...");
});
