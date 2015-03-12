tests.apply({
	name:"suitener describe executes",
	fn:function() {
		var temp = console.log;
		var logs = [];
		console.log = function(body) {
			logs.push(body);
		}
		describe("test package",function(){}) // this is what we are testing
		
		expect(logs.length).to.equal(1);
		expect(JSON.parse(logs[0])).to.deepEqual({
			"errorLog":[],
			"testLog":[],
			"stat":{
				"count":0,
				"fails":0,
				"success":0
			}
		});
		
		console.log = temp;
	}
})


