const { client, dbname } = require('../dbconfig');
const { ObjectId } = require('mongodb');

exports.createMentor = async (req, res) => {
    const { name, email, experience } = req.body;
    if (!name || !email || !experience) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        await client.connect();
        const result = await client.db(dbname).collection('Mentor').insertOne({ name, email, experience, studentsAssigned: [] });
        client.close();
        res.status(201).json({ message: "Mentor created successfully", data: result.ops ? result.ops[0] : result });
    } catch (error) {
        client.close();
        res.status(500).json({ message: "Failed to create mentor", error: error.message });
    }
};



exports.getAllMentors = async (req, res) => {
    try {
        await client.connect();
        const mentors = await client.db(dbname).collection('Mentor').find().toArray();
        client.close();
        res.status(200).json({ message: "All mentors fetched", data: mentors });
    } catch (error) {
        client.close();
        res.status(500).json({ message: "Failed to fetch mentors", error: error.message });
    }
};

exports.getMentorById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        await client.connect();
        const mentor = await client.db(dbname).collection('Mentor').findOne({ _id: new ObjectId(id) });

        if (!mentor) return res.status(404).json({ message: "Mentor not found" });
        res.status(200).json({ data: mentor });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch mentor", error: error.message });
    } finally {
        client.close();
    }
};
