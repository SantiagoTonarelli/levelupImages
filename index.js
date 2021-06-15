const fs = require("fs");
const figlet = require("figlet");
const unzip = require("unzipper");
const argv = require("yargs")
	.option("z", {
		alias: "zip",
		type: "string",
		demandOption: true,
	})
	.option("f", {
		alias: "file",
		type: "string",
		demandOption: true,
	})
	.option("p", {
		alias: "project",
		type: "string",
		demandOption: true,
	})
	.check((argv, options) => {
		if (argv.z === null || argv.z === "") {
			throw "Es necesario pasar la direccion del zip, NABO";
		} else if (argv.p === null || argv.p === "") {
			throw "Es necesario pasar la direccion del proyecto, GIL";
		} else if (argv.f === null || argv.f === "") {
			throw "Es necesario pasar el nombre del archivo Maestro";
		}
		return true;
	}).argv;

const drawableFolder = [
	"drawable-hdpi",
	"drawable-mdpi",
	"drawable-xhdpi",
	"drawable-xxhdpi",
	"drawable-xxxhdpi",
];

const zip = argv.z || "";
const nameFile = `${argv.f}.png` || "";
const projectName = argv.p || "";

let fileDefaultName;
let targetPath;

const unZip = () => {
	try {
		targetPath = zip.substring(0, zip.lastIndexOf("/"));
		let readStream = fs.createReadStream(zip);
		let extract = unzip.Extract({path: targetPath});

		extract.on("error", () =>
			console.error("Ja gil no funciona, copia a mano")
		);
		extract.on("close", () => {
			console.log("Aguantaa...");
			const fileDefaultNamePath = `${targetPath}/${drawableFolder[0]}/`;
			try {
				var files = fs.readdirSync(fileDefaultNamePath);
				fileDefaultName = files[0];
				drawableFolder.forEach(insert);
				fs.unlinkSync(zip);
				figlet("Listo,\n Anda a laburar!", function (err, data) {
					if (err) {
						console.log("Listo, Anda a laburar!");
						return;
					}
					console.log(data);
				});
			} catch (error) {
				console.error("Ja gil no funciona, copia a mano");
				console.error(error);
			}
		});
		readStream.pipe(extract);
	} catch (error) {
		console.error("Ja gil no funciona, copia a mano2");
		console.error(error);
	}
};

const insert = (d, i) => {
	fs.renameSync(
		`${targetPath}/${drawableFolder[i]}/${fileDefaultName}`,
		`${targetPath}/${drawableFolder[i]}/${nameFile}`
	);
	fs.copyFileSync(
		`${targetPath}/${drawableFolder[i]}/${nameFile}`,
		`${projectName}/levelUpWhiteLabelBuildApp/src/main/res/${drawableFolder[i]}/${nameFile}`
	);
	fs.unlinkSync(`${targetPath}/${drawableFolder[i]}/${nameFile}`);
	fs.rmdirSync(`${targetPath}/${drawableFolder[i]}`);
};

unZip();
