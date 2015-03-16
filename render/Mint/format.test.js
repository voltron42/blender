describe("Mint format", function() {
	it("empty", function() {
		var value = Mint.format("");
		expect(value).to.equal("");
	});
	it("simple", function() {
		var tpl = "$3$, $2$, $1$, $0$";
		var value = Mint.format(tpl, 1, 2, 3, 4);
		expect(value).to.equal("4, 3, 2, 1");
	});
	it("apply", function() {
		var tpl = "$3$, $2$, $1$, $0$";
		var args = [1, 2, 3, 4];
		var value = Mint.format.apply(null, [].concat(tpl, args));
		expect(value).to.equal("4, 3, 2, 1");
	})
});