const request = require("request-promise")
const cheerio = require("cheerio ")
const fs = require(fs);
const json2csv = require("json2csv").Parser;

const gist = "https://thenet.ng/";

(async() => {
    let netData = []
    const response = await request({
        uri: gist,
        headers:{
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"accept-encoding": "gzip, deflate, br",
"accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
        },
        br: true,
    });
    let $ = cheerio.load(response)
   let  links=jQuery('ul[class="nav navbar-nav"] > li').text()
    let title=jQuery('header[class="entry-header"] > h2 > a').text()

    netData.push({
        links,
        title,
    });

    const j2cp= new json2csv()
    const csv = j2cp.parse(netData)

    fs.writeFileSync("./webscrapper.csv", csv, "utf-8");



}

)()