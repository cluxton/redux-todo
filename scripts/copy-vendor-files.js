var fs = require('fs');
var path = require('path');

var items = [
	['node_modules/react/dist/react.min.js', 'server/public/js'],
	['node_modules/sw-toolbox/sw-toolbox.js', 'server/public/js']
];

console.log('\nCopying vendor files');

items.forEach(function(item) {
	var source = path.join(__dirname, '../', item[0]);
	var destinationFolder = path.join(__dirname, '../', item[1]);
	var destinationFile = path.join(destinationFolder, path.basename(source));

	try {
		fs.mkdirSync(destinationFolder);
	} catch (e) {
		if (e.code != 'EEXIST') throw e;
	}

	console.log("\t" +  item[0] + "  ->  " + item[1]);

	fs.createReadStream(source).pipe(fs.createWriteStream(destinationFile));
});
console.log('Done');