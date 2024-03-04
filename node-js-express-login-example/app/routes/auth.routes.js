const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
var ImageKit = require("imagekit");
const imageController = require("../controllers/image.controller"); // Adjust the path according to your project 
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signout", controller.signout);  
  app.post("/auth", controller.auth);
  app.get("/api/user/:userId/images", imageController.fetchImagesByUserId);
  app.get('/auth', function(req, res) {
    
    var imagekit = new ImageKit({
        publicKey : "public_PUOavNdMUox0aomZfROwnNzORIw=",
        privateKey : "private_g0UNcCaBpbnDCJt99hhSnMkVqIs=",
        urlEndpoint : "https://ik.imagekit.io/hamza"
    });
    
    var authenticationParameters = imagekit.getAuthenticationParameters();
    console.log(authenticationParameters);
    res.json(authenticationParameters);
  });
  
};