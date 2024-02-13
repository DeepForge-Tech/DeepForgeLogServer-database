const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("./Connect");

const Log = sequelize.define("logs", {
    name_program: DataTypes.STRING,
    architecture: DataTypes.STRING,
    os_name: DataTypes.STRING,
    log_text: DataTypes.TEXT,
    channel: DataTypes.STRING,
    function_name: DataTypes.STRING,
    createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
    }
},
    {
        createdAt: false,
        updatedAt: false,
    }
);
const User = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    // email: {
    //     type: DataTypes.STRING,
    //     unique: true,
    //     isEmail: true, //checks for email format
    //     allowNull: true
    // },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
    }
},
    {
        createdAt: false,
        updatedAt: false,
    }
);
const Test = sequelize.define("tests", {
    name: DataTypes.STRING,
    architecture: DataTypes.STRING,
    os_name: DataTypes.STRING,
    function_name:
    {
        type:DataTypes.STRING,
        allowNull:true
    },
    createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
    }
},
    {
        createdAt: false,
        updatedAt: false,
    }
);
module.exports = {
    Test,
    Log,
    User
}