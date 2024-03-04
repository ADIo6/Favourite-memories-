const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./app/models");
const UserImages = db.userImages;
const app = express();

app.use(cors());
/* for Angular Client (withCredentials) */
/* app.use(
  cors({
    credentials: true,
    origin: ["http://127.0.0.1:5500"],
  })
); */

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
  // initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Adil's application." });
});

  
app.post('/api/store-image-data', async (req, res) => {
  const { user_id, image_url } = req.body; // Make sure these match the names in your request body
  console.log(req.body)
  if (!user_id || !image_url) {
      return res.status(400).send({ message: "userId and imageUrl are required." });
  }

  try {
      const userImage = await db.userImages.create({
          userId: user_id, // Map from `user_id` to `userId`
          imageUrl: image_url, // Map from `image_url` to `imageUrl`
      });

      res.json(userImage);
  } catch (error) {
      console.error('Failed to store image data:', error);
      res.status(500).send({ message: 'Server error' });
  }
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
