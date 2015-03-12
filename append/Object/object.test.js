describe("Object prototype extentions",function(){
describe("apply function",function(){
it("exclusive",function(){
var obj = {a:1};
obj.apply({b:2});
expect(obj).to.deepEqual({a:1,b:2});
});
it("ignore", function(){
var obj = {a:1};
obj.apply({a:2});
expect(obj).to.deepEqual({a:1});
});
it("override", function(){
var obj = {a:1};
obj.apply({a:2}, true);
expect(obj).to.deepEqual({a:2});
});
});
});


