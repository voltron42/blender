tests.apply({
	name:"testing equals",
	fn:function() {
		var a = 5;
		expect(a).to.equal(5);
		expect(a).to.not.equal(6);
	}
},{
	name:"testing equal fail",
	fn:function() {
		
	}
})