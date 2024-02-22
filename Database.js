const Models = require("./Models");
const Sequelize = require('sequelize');
const sequelize = require("./Connect");

sequelize.sync({ alter: true });
const models = {
    "logs": Models.Log,
    "tests": Models.Test,
    "users": Models.User,
    "roles": Models.Role
}
class DB {
    async insertToDatabase(Data,Table) {
        try {
            var result;
            await models[Table].create(Data).then((output) => result = output
            ).catch((error) => {
                console.error('Failed to create a new record: ', error);
            });

            // sequelize.query(SQL_QUERY, {
            //     raw: true, //если для таблицы, к которой происходит обращение, не определена модель
            //     type: Sequelize.QueryTypes.SELECT, //тип запроса: SELECT | INSERT | UPDATE | DELETE ...
            // }).then((output) => result = output);
            return result;
        }
        catch (error) {
            console.error(error);
            return 400;
        }
    }
    async WakeUpDatabase() {
        try {
            var result;
            const test = await Models.Test.create({
                name: "test_1",
                architecture: "amd64",
                os_name: "Linux",
                function_name: "WakeUpDatabase"
            }).catch((error) => {
                console.error('Failed to create a new record : ', error);
            });
            await test.destroy()
                .then((output) => result = output)
                .catch((error) => {
                    console.error('Failed to create a new record : ', error);
                });
            return result;
        }
        catch (error) {
            console.log(error);
            return 400;
        }
    }
    async findFromDatabase(Data,Table)
    {
        try {
            const user = await models[Table].findOne({where: Data}).catch((error) => {
                console.error('Failed to find a record: ', error);
            });
            return user;
            // sequelize.query(SQL_QUERY, {
            //     raw: true, //если для таблицы, к которой происходит обращение, не определена модель
            //     type: Sequelize.QueryTypes.SELECT, //тип запроса: SELECT | INSERT | UPDATE | DELETE ...
            // }).then((output) => result = output);
        }
        catch (error) {
            console.error(error);
            return 400;
        }
    }
    async findAllFromDatabase(Table) {
        try {
            const records = await models[Table].findAll();
            return records;
        }
        catch (error) {
            console.log(error);
            return 400;
        }
    }
};
module.exports = new DB()