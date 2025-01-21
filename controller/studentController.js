const { client, dbname } = require('../dbconfig');
const { ObjectId } = require('mongodb');

exports.createStudent = async (req, res) => {
    const { name, email, grade } = req.body;

    if (!name || !email || !grade) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await client.connect();
        const result = await client.db(dbname).collection('Students').insertOne({ name, email, grade, mentor: null });

        // Check if the insertion was successful
        if (result.insertedId) {
            res.status(201).json({
                message: "Student created successfully",
                data: { _id: result.insertedId, name, email, grade, mentor: null }
            });
        } else {
            res.status(500).json({ message: "Failed to create student" });
        }
    } catch (error) {
        console.error("Error during student creation:", error);
        res.status(500).json({ message: "Failed to create student", error: error.message });
    } finally {
        await client.close();
    }
};


// Assign mentor
exports.assignMentorToStudent = async (req, res) => {
    const { mentorId, studentId } = req.body;
    if (!mentorId || !studentId) {
        return res.status(400).json({ message: "Mentor ID and Student ID are required" });
    }
    try {
        await client.connect(); 
        const result = await client.db(dbname).collection('Students').updateOne(
            { _id: new ObjectId(studentId) },
            { $set: { mentor: new ObjectId(mentorId) } }
        );
        res.status(200).json({ message: "Mentor assigned to student successfully" });
    } catch (error) {
        console.error("Error during mentor assignment:", error);
        res.status(500).json({ message: "Failed to assign mentor", error: error.message });
    } finally {
        await client.close();
    }
};

// Get unassigned students
exports.getUnassignedStudents = async (req, res) => {
    try {
        await client.connect();
        const students = await client.db(dbname).collection('Students').find({ mentor: null }).toArray();
        res.status(200).json({ message: "Unassigned students fetched successfully", data: students });
    } catch (error) {
        console.error("Error fetching unassigned students:", error);
        res.status(500).json({ message: "Failed to fetch unassigned students", error: error.message });
    } finally {
        await client.close();
    }
};

// Change student mentor
exports.changeStudentMentor = async (req, res) => {
    const { studentId, newMentorId } = req.body;
    console.log("Request Body:", req.body);

    if (!studentId || !newMentorId) {
        return res.status(400).json({ message: "Student ID and New Mentor ID are required" });
    }

    if (!ObjectId.isValid(studentId) || !ObjectId.isValid(newMentorId)) {
        return res.status(400).json({ message: "Invalid Student ID or New Mentor ID" });
    }

    try {
        await client.connect();
        const result = await client.db(dbname).collection('Students').updateOne(
            { _id: new ObjectId(studentId) },
            { $set: { mentor: new ObjectId(newMentorId) } }
        );
        res.status(200).json({ message: "Student mentor updated successfully" });
    } catch (error) {
        console.error("Error updating mentor:", error);
        res.status(500).json({ message: "Failed to update mentor", error: error.message });
    } finally {
        await client.close();
    }
};

// Get students by mentor
exports.getStudentsByMentor = async (req, res) => {
    const { mentorId } = req.params;
    if (!mentorId) {
        return res.status(400).json({ message: "Mentor ID is required" });
    }

    try {
        await client.connect();
        const students = await client.db(dbname).collection('Students').find({ mentor: ObjectId(mentorId) }).toArray();
        res.status(200).json({ message: "Students by mentor fetched successfully", data: students });
    } catch (error) {
        console.error("Error fetching students by mentor:", error);
        res.status(500).json({ message: "Failed to fetch students by mentor", error: error.message });
    } finally {
        await client.close();
    }
};

// Get previous mentors for a student
exports.getPreviousMentors = async (req, res) => {
    const { studentId } = req.params;
    if (!studentId) {
        return res.status(400).json({ message: "Student ID is required" });
    }

    if (!ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: "Invalid Student ID" });
    }

    try {
        await client.connect();
        const student = await client.db(dbname).collection('Students').findOne({ _id: new ObjectId(studentId) });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const previousMentors = student.previousMentors || [];
        res.status(200).json({ message: "Previous mentors fetched successfully", data: previousMentors });
    } catch (error) {
        console.error("Error fetching previous mentors:", error);
        res.status(500).json({ message: "Failed to fetch previous mentors", error: error.message });
    } finally {
        await client.close();
    }
};
