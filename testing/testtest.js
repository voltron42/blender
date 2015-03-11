(function(){
	var Tester =function() {
		var allTests = [];
		this.apply = function(){
			for (var x =0; x < arguments.length; x++) {
				allTests.push(arguments[x]);
			}
		}
		this.run = function() {
			document.getElementById("output").innerHTML = allTests.map(function(test){
				var error;
				try {
					test.fn();
				} catch (e) {
					console.log(e)
					error = e;
				}
				return [
					"<li class=\"",
					(error?"fail":"success"),
					"\"><pre>",
					test.name,
					(error?[
						"<ul><li>",
						error,
						"</li></ul>",
					].join(""):""),
					"</pre></li>",
				].join("");
			}).join("");
		}
	}
	this.tests = new Tester();
})()