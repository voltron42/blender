(function() {
	var raw = {
		"equal": {
			"msg": "Values are not equal:\n\tActual: $$$,\n\tExpected: $$$",
			"not": "Values are equal:\n\tActual: $$$,\n\tExpected: $$$",
			"params": "expected",
			"cond": "this == expected"
		},
		"deepEqual": {
			"msg": "Values are not equal:\n\tActual: $$$,\n\tExpected: $$$",
			"not": "Values are equal:\n\tActual: $$$,\n\tExpected: $$$",
			"params": "expected",
			"cond": "deep.eq(this,expected)"
		},
		"exist": {
			"msg": "Value does not exist!",
			"not": "Value exists:\n\tValue:$$$",
			"params": "",
			"cond": "typeof this != undefined && this != null"
		},
		"match": {
			"msg": "",
			"not": "",
			"params": "regex",
			"cond": "new RegExp(regex).test(this)"
		},
		"be": {
			"*": {
				"msg": "",
				"not": "",
				"params": "expected",
				"cond": "this === expected"
			},
			"a": {
				"msg": "",
				"not": "",
				"params": "type",
				"cond": "typeof this == type"
			},
			"anInstanceOf": {
				"msg": "",
				"not": "",
				"params": "constructor",
				"cond": "this instanceof constructor"
			},
			"undefined:": {
				"msg": "",
				"not": "",
				"params": "",
				"cond": "typeof this == 'undefined'"
			},
			"null": {
				"msg": "",
				"not": "",
				"params": "",
				"cond": "this == null"
			},
			"ok": {
				"msg": "",
				"not": "",
				"params": "",
				"cond": "this?true:false"
			},
			"empty": {
				"msg": "",
				"not": "",
				"params": "",
				"cond": "((this instanceof Array) || typeof this == 'string')&& this.length == 0) || (typeof this == 'object' && Object.keys(this).length == 0)"
			},
			"true": {
				"msg": "",
				"not": "",
				"params": "",
				"cond": "this === true"
			},
			"false": {
				"msg": "",
				"not": "",
				"params": "",
				"cond": "this === false"
			},
			"lessThan": {
				"msg": "",
				"not": "",
				"params": "bound",
				"cond": "this < bound"
			},
			"greaterThan": {
				"msg": "",
				"not": "",
				"params": "bound",
				"cond": "this > bound"
			},
			"within": {
				"msg": "",
				"not": "",
				"params": "low, high",
				"cond": "this <= high && value >= low"
			}
		},
		"have": {
			"any": {
				"*": {
					"msg": "",
					"not": "",
					"params": "",
					"cond": "contains.any(this, arguments)"
				},
				"keys": {
					"msg": "",
					"not": "",
					"params": "",
					"cond": "contains.any(Object.keys(this), arguments)"
				}
			},
			"all": {
				"*": {
					"msg": "",
					"not": "",
					"params": "",
					"cond": "contains.all(this, arguments)"
				},
				"keys": {
					"msg": "",
					"not": "",
					"params": "",
					"cond": "contains.all(Object.keys(this), arguments)"
				}
			},
			"length": {
				"*": {
					"msg": "",
					"not": "",
					"params": "bound",
					"cond": "this.length == bound"
				},
				"lessThan": {
					"msg": "",
					"not": "",
					"params": "bound",
					"cond": "this.length < bound"
				},
				"greaterThan": {
					"msg": "",
					"not": "",
					"params": "bound",
					"cond": "this.length > bound"
				},
				"within": {
					"msg": "",
					"not": "",
					"params": "low, high",
					"cond": "this.length <= high && this.length >= low"
				}
			},
			"property": {
				"msg": "",
				"not": "",
				"params": "key, value",
				"cond": "this[key] == value"
			},
			"ownProperty": {
				"msg": "",
				"not": "",
				"params": "key",
				"cond": "key in this"
			},
			"deepProperty": {
				"msg": "",
				"not": "",
				"params": "key, value",
				"cond": "deep.prop(this,key,value)"
			}
		},
		"contain": {
			"msg": "Substring is not present in value:\n\tValue: $$$,\n\tSubstring: $$$",
			"not": "Substring is present in value:\n\tValue: $$$,\n\tSubstring: $$$",
			"params": "needle",
			"cond": "this.indexOf(needle) >= 0"
		}
	};
	var deep = {
		eq:function(a, b) {
			
		},
		prop:function(obj, key, value) {
			
		},
	}
	var contains = {
		all:function(haystack, needles) {
			
		}
		any:function(haystack, needles) {
			
		}
	}
	var Body = function(message, compare) {
		this.check = function(value) {
			return function() {
				if (!compare.apply(value,arguments)) {
					throw new Error(message)
				}
			}
		}
		this.negate = function(msg) {
			return new Body(msg,function() {
				return (!compare.apply(null,arguments));
			});
			}
		}
	}
	var to = {};
	var not = {};
	this.expect = function(actual) {
	}
})()



