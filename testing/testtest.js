(function(){
var Tester =function() {
var allTests = [];
this.apply = function(){
for (var x =0; x < arguments.length; x++) {
allTests.push(arguments[x]);
}
}
this.run = function() {
post(allTests.map(function(test){

}));
}
}
this.tests = new Tester():
})()