var onvif = require('onvif');

discovery();
var interval = null;
var parseString = require('xml2js').parseString;
 

function discovery() {
	console.log("begin search --------------------------");
	onvif.Discovery.on('device', function(cam, remoteInfo) {
		console.log(JSON.stringify(remoteInfo));
	});

	onvif.Discovery.probe({
		timeout: 3000,
		resolve: false
	}, function(err, cams) {
		if (err) {
			throw err;
		}
		cams.forEach(function(cam) {
			console.log(JSON.stringify(cam));
		});
		if (interval) {
			clearInterval(interval);
		}
		interval = setInterval(function() {
			discovery();
		}, 3000);
	}); 
}