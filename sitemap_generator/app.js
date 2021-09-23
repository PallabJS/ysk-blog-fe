import fs from "fs";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __targetRoot = path.resolve();

// MONGO CONNECTION VARIABLES
let mongoUri = "mongodb+srv://pjs:pjs@luxems.5w7ky.mongodb.net/ysk?retryWrites=true&w=majority";
let databaseName = "ysk";

// Call this when the app starts
const generate = async () => {
    let client = await MongoClient.connect(mongoUri);
    let db = client.db(databaseName);
    console.log("Mongo db online");

    // Get file pointer
    let initialData = fs.readFileSync(__dirname + "/initial.xml", "utf-8");
    console.log("Initial xml string collected");

    // Game on

    let posts = await db.collection("posts").find({}).toArray();
    console.log("collected all posts");
    let xml = initialData.replace("</urlset>", "");
    posts.forEach((post, index) => {
        if (index !== 0) xml += "\n";
        xml += `\t<url>\
                    \n\t\t<loc>https://youshouldknow.live/${post.meta.category}/${post.title}</loc>\
                    \n\t\t<priority>1.0</priority>\
                \n\t</url>`;
    });

    console.log("Writing to file");
    xml += "\n</urlset>";
    fs.writeFileSync(__targetRoot + "/public/sitemap.xml", xml);

    console.log("Opertion completed!");
    process.exit(0);
};

generate();
