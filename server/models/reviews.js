module.exports = (sequelize,DataTypes) => {
    const reviews = sequelize.define("reviews", {
        
        reviewstext: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });
    return reviews;
}