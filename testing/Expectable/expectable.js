(function() {
var Body = function(message, compare) {
  this.check = function() {
    if (!compare.apply(null,arguments)) {
      throw new Error(message)
    }
  }
  this.negate = function(msg) {
    return new Body(msg,function() {
      return (!compare.apply(null,arguments));
    });
  }
}
var bodies = {
equalTo:{
  msg:"Values are not equal:\n",
  fn:function(actual,expected) {
  return actual == expected;
}},
exactEqual:{
  msg:"", 
  fn:function(actual, expected) {
  return actual === expected;
}},
};
this.expect = function(actual) {
var chain = {
	"to": {
		"match":"(regex)",
		"exist":"()",
		"be":{
			"*":"(value)",
			"a":"(type string)",
			"anInstanceOf":"(constructor)",
			"undefined:":"()",
			"arguments:":"()",
			"null":"()",
			"empty":"()",
			"ok":"()",
			"true":"()",
			"false":"()",
			"within":"(low, high)",
			"lessThan":"(value)",
			"greaterThan":"(value)"
		},
		"equal":"fn(value)",
		"deepEqual":"fn(value)",
		"have":{
			"any":{
				"*":"(values...)",
				"keys":"(values...)",
			},
			"all":{
				"*":"(values...)",
				"keys":"(values...)",
			},
			"length":{
				"*":"(value)",
				"within":"(low, high)",
				"lessThan":"(value)",
				"greaterThan":"(value)"
			},
			"property":"(key, value)",
			"ownProperty":"(name)",
			"deepProperty":"(key, value)"
		},
		"include":{
			"*":"(element)",
			"keys":"(values...)",
		},
		"contain":"(substring)",
		"not":"..."
	}
};
return chain;
}
})()



