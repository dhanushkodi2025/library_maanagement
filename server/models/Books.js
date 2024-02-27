const { Model } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    const Books = sequelize.define("Books", {
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        author: {
            type: DataTypes.STRING,
            allowNull:false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull:false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull:false
        },
        publishdate: {
            type: DataTypes.STRING,
            allowNull:false
        }
    })
    Books.associate = (models) => {
        Books.hasMany(models.reviews, {
            onDelete:"cascade",
        })
    }
    return Books;
}