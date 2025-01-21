const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
});


app.get('/', (req, res) => {
    return res.status(200).send(`<!DOCTYPE html>
      <html>
        <head>
          <title>Mentor and Student Management</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h1 {
              color: #4CAF50;
            }
            sup {
              color:rgb(228, 14, 14);
            }
            span {
              color:rgb(47, 9, 236);
            }
            table {
              width: 90%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Mentor and Student Management<sup>*</sup></h1>
          <p>Welcome to the mentor and student management system. Below are the available APIs:</p>
          <table>
            <tr>
              <th>Feature</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>Mentors</td>
              <td>
                <span>/mentors/create</span> Create a new mentor<br/>
                <span>/mentors/</span> List all mentors<br/>
                <span>/mentors/:id</span> Get details of a specific mentor
              </td>
            </tr>
            <tr>
              <td>Students</td>
              <td>
                <span>/students/create</span> Create a new student<br/>
                <span>/students/assign</span> Assign a student to a mentor<br/>
                <span>/students/unassigned</span> Get a list of unassigned students<br/>
                <span>/students/change-mentor</span> Change mentor for a specific student<br/>
                <span>/students/by-mentor/:mentorId</span> List all students assigned to a specific mentor<br/>
                <span>/students/previous-mentors/:studentId</span> Get the previously assigned mentors for a student
              </td>
            </tr>
          </table>
          <h2><sup>*</sup>Please Use POSTMAN</h2>
        </body>
      </html>`);
});