const fs = require("fs");
const unzip = require("unzipper");

const drawableFolder = [
	"drawable-hdpi",
	"drawable-mdpi",
	"drawable-xhdpi",
	"drawable-xxhdpi",
	"drawable-xxxhdpi",
];

const zip =
	"/Users/santiagotonarelli/Desktop/assets_Registration_addCard_2021-06-01.zip";
const nameFile = "caca";
let fileDefaultName;

const targetPath = zip.substring(0, zip.lastIndexOf("/"));

let readStream = fs.createReadStream(
	"/Users/santiagotonarelli/Desktop/assets_Registration_addCard_2021-06-01.zip"
);
let extract = unzip.Extract({path: targetPath});

extract.on("error", () => console.error("Ja gil no funciona, copia a mano"));
extract.on("close", () => {
	console.log("Aguantaa...");
    const fileDefaultNamePath = `${targetPath}/drawableFolder/`
    fileDefaultName = str.substring(str.lastIndexOf('/')+1);
	drawableFolder.forEach((d, i) => insert);
});

readStream.pipe(extract);

const insert = (d, i) => {
    fs.rename(`${targetPath}/d/${};


}
