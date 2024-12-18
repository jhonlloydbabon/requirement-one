const pg = require('../database/config');
const path = require('path');

const message = (status, message)=>{
    return {status, message};
};

const uploadFeedback = async (req, res) => {
    try {
        const { name, occupation, company, description, rate } = req.body;

        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${path.basename(req.file.path)}`;

        const result = await pg.query(
            "INSERT INTO feedback (name, occupation, company, profile, description, rate) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, occupation, company, fileUrl, description, rate]
        );

        res.status(200).json(message(200, result.rows[0]));
    } catch (error) {
        console.error(error);
        res.status(500).json(message(500, "Server Error"));
    }
};

const fetchFeedback = async(req, res) =>{
    try {
      const result = await pg.query("SELECT * FROM feedback");
      res.status(200).json(message(200, result.rows));
    } catch (error) {
        console.log(error);
        res.status(500).json(message(500,"Server Error"));
    }
};

module.exports = {uploadFeedback, fetchFeedback};