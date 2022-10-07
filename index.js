const express = require("express");
const cors = require("cors");
const { airport } = require("./data");
const app = express();
app.use(cors());
require("dotenv").config();

app.use("/get", (req, res) => {
	try {
		const key = req.query.key;
		if (!req.query.key || req.query.key.length < 1)
			return res.status(200).send({
				data: airport.slice(0, 100),
			});
		let data = airport.filter((item) => item.name.toLowerCase().includes(key.toLowerCase()) || item.iata.toLowerCase().includes(key.toLowerCase()));
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
