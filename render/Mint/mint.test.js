describe("Mint template", function(){
	it("empty", function() {
		var tpl = Mint.compile("");
		var value = tpl.apply("");
		expect(value).to.equal("");
	});
	it("single var", function() {
		var tpl = Mint.compile("$=a$");
		var value = tpl.apply({a:5});
		expect(value).to.equal(5);
	});
	it("single var with string", function() {
		var tpl = Mint.compile("Hello $=name$!");
		var value = tpl.apply({name:"Steve"});
		expect(value).to.equal("Hello Steve!");
	});
	it("multiple var with complex template", function() {
		var tpl = Mint.compile("$=first$ $=last$ will be indexed as \"$=last$, $=first$\".");
		expect(tpl.apply({first:"Steve",last:"Rogers"})).to.equal("Steve Rogers will be indexed as \"Rogers, Steve\".");
		expect(tpl.apply({first:"Bruce",last:"Wayne"})).to.equal("Bruce Wayne will be indexed as \"Wayne, Bruce\".");
	});
	it("deep var with complex template", function() {
		var tpl = Mint.compile("$=name.first$ $=name.last$ will be indexed as \"$=name.last$, $=name.first$\".");
		expect(tpl.apply({name:{first:"Steve",last:"Rogers"}})).to.equal("Steve Rogers will be indexed as \"Rogers, Steve\".");
		expect(tpl.apply({name:{first:"Bruce",last:"Wayne"}})).to.equal("Bruce Wayne will be indexed as \"Wayne, Bruce\".");
	});
	it("conditional",function() {
		var tpl = Mint.compile("I like $?poop$poop $$$sandwiches.");
		expect(tpl.apply({poop:false})).to.equal("I like sandwiches.");
		expect(tpl.apply({poop:true})).to.equal("I like poop sandwiches.");
	});
	it("object list", function() {
		var str = "Tonight's lottery numbers are $!numbers$$=value$, $$$and the powerball is $=powerball$.";
		var tpl = Mint.compile(str);
		var data = {numbers:[{value:5},{value:7},{value:12},{value:17},{value:25},{value:28}],powerball:16};
		var expected = "Tonight's lottery numbers are 5, 7, 12, 17, 25, 28, and the powerball is 16.";
		expect(tpl.apply(data)).to.equal(expected);
	});
	it("primitive list", function() {
		var str = "Tonight's lottery numbers are $!numbers$$=_parent.data.numbers[_index]$, $$$and the powerball is $=powerball$.";
		var tpl = Mint.compile(str);
		var data = {numbers:[5,7,12,17,25,28],powerball:16};
		var expected = "Tonight's lottery numbers are 5, 7, 12, 17, 25, 28, and the powerball is 16.";
		expect(tpl.apply(data)).to.equal(expected);
	});
	it("map", function() {
		var str = "Stats: $!stats$$=_index$ := $=_parent.data.stats[_index]$; $$$";
		var tpl = Mint.compile(str);
		var data = {stats:{x:5,y:8,h:20,w:13}};
		var expected = "Stats: x := 5; y := 8; h := 20; w := 13; ";
		expect(tpl.apply(data)).to.equal(expected);
	});
});



