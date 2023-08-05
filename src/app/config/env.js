module.exports = {
    development: {
        db: {
            type: "mysql",
            host: "localhost",
            port: "4306",
            username: "vl_qa",
            password: "viewlift1234",
            database: "viewlift_tools_qa",
        },
    },
    staging: {
        db: {
            type: "mysql",
            host: "viewlift-staging.c2outdz3unzp.us-east-1.rds.amazonaws.com",
            port: "3306",
            username: "vl_qa",
            password: "viewlift1234",
            database: "viewlift_tools_qa",
        },
    },
    production: {
        db: {
            type: "mysql",
            host: "localhost",
            port: "5306",
            username: "viewlift",
            password: "ViewLift10012!",
            database: "viewlift_tools",
        },
    },
}