var expectError = function(message, operation) {
	var error;
	try {
		operation();
	} catch(e) {
		console.log(e);
		error = e;
	}
	if (!error) {
		throw new Error("error not thrown")
	}
	if (error.message != message) {
		throw new Error("actual error does not match expected:\nactual:"+error.message+"\nexpected:"+message);
	}
}
tests.apply({
	name:"testing equals",
	fn:function() {
		var a = 5;
		expect(a).to.equal(5);
		expect(a).to.not.equal(6);
		expectError("Values are equal:\n\tActual: 5,\n\tExpected: 5",function(){
			expect(a).to.not.equal(5);
		})
		expectError("Values are not equal:\n\tActual: 5,\n\tExpected: 6",function(){
			expect(a).to.equal(6);
		})
	}
},{
	name:"testing deep equal",
	fn:function() {
		var a = {
			a:1,
			b:"2",
			c:[5,6,7]
		}
		expect(a).to.deepEqual({
			b:2,
			a:"1",
			c:"567".split("")
		})
		expect(a).to.not.deepEqual({})
		
	}
},{
	name:"testing exist",
	fn:function(){
		var obj = 5;
		expect(obj).to.exist();
		expect(obj.steve).to.not.exist();
	}
})