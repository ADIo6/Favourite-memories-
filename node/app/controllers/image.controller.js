// Import necessary modules. Here we assume you're using Sequelize ORM for database operations.
const db = require("../models"); // Adjust this path to where your models are defined
const UserImages = db.userImages; // Access the UserImages model

const imageController = {
    // Function to fetch images by userId
    fetchImagesByUserId: async (req, res) => {
        try {
            const userId = req.params.userId; // Get userId from URL parameters
            const userImages = await UserImages.findAll({
                where: {
                    userId: userId // Use userId to filter images
                }
            });

            if (userImages.length > 0) {
                res.status(200).send(userImages); // Send back the list of images
            } else {
                res.status(404).send({ message: "No images found for the given user." });
            }
        } catch (error) {
            res.status(500).send({ message: "Error retrieving images", error: error.message }); // Handle errors
        }
    }
    // You can define more functions here to handle other image-related operations
};

module.exports = imageController; // Export the controller for use in your routes
