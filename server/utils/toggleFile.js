const fs = require("fs/promises");
const path = require("path");

exports.readFile = async (location) => {
    const filePath = path.resolve(process.dirname + location);

    const dbResponce = await fs.readFile(filePath, { encoding: "utf-8" });

    return JSON.parse(dbResponce);
};

exports.writeFile = async (location, data) => {
    const filePath = path.resolve(process.dirname + location);

    const records = await this.readFile(location);
    records.push(data);

    await fs.writeFile(filePath, JSON.stringify(records));
};
