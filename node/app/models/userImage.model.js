module.exports = (sequelize, Sequelize) => {
    const UserImages = sequelize.define("UserImages", {
      imageId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'image_id' // Maps 'imageId' in the model to 'image_id' in the table
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Assumes your user table is named 'users'
          key: 'id',
        },
        field: 'user_id' // Maps 'userId' in the model to 'user_id' in the table
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'image_url' // Maps 'imageUrl' in the model to 'image_url' in the table
      },
      uploadedAt: {
        type: Sequelize.DATE,
        field: 'uploaded_at', // Maps 'uploadedAt' in the model to 'uploaded_at' in the table
        defaultValue: Sequelize.NOW // Sets the default value to the current time
      }
    }, {
      tableName: 'user_images', // Explicitly specifies the table name
      timestamps: false // Disables Sequelize's automatic timestamp fields (createdAt and updatedAt)
    });
  
    return UserImages;
  };
  