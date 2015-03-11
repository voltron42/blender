var expecting = [{
	"path": "equal",
	"msg": "Values are not equal:\n\tActual: $$$,\n\tExpected: $$$",
	"not": "Values are equal:\n\tActual: $$$,\n\tExpected: $$$",
	"params": "expected",
	"cond": "this == expected"
},
{
	"path": "deepEqual",
	"msg": "Values are not equal:\n\tActual: $$$,\n\tExpected: $$$",
	"not": "Values are equal:\n\tActual: $$$,\n\tExpected: $$$",
	"params": "expected",
	"cond": "deep.eq(this,expected)"
},
{
	"path": "exist",
	"msg": "Value does not exist!",
	"not": "Value exists:\n\tValue:$$$",
	"params": "",
	"cond": "this != undefined && this != null && this != global()"
},
{
	"path": "match",
	"msg": "",
	"not": "",
	"params": "regex",
	"cond": "new RegExp(regex).test(this)"
},
{
	"path": "be",
	"msg": "",
	"not": "",
	"params": "expected",
	"cond": "this === expected"
},
{
	"path": "be.a",
	"msg": "",
	"not": "",
	"params": "type",
	"cond": "typeof this == type"
},
{
	"path": "be.anInstanceOf",
	"msg": "",
	"not": "",
	"params": "constructor",
	"cond": "this instanceof constructor"
},
{
	"path": "be.undefined:",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "typeof this == 'undefined'"
},
{
	"path": "be.null",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "this == null"
},
{
	"path": "be.ok",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "this?true:false"
},
{
	"path": "be.empty",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "(((this instanceof Array) || typeof this == 'string')&& this.length == 0) || (typeof this == 'object' && Object.keys(this).length == 0)"
},
{
	"path": "be.true",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "this === true"
},
{
	"path": "be.false",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "this === false"
},
{
	"path": "be.lessThan",
	"msg": "",
	"not": "",
	"params": "bound",
	"cond": "this < bound"
},
{
	"path": "be.greaterThan",
	"msg": "",
	"not": "",
	"params": "bound",
	"cond": "this > bound"
},
{
	"path": "be.within",
	"msg": "",
	"not": "",
	"params": "low, high",
	"cond": "this <= high && value >= low"
},
{
	"path": "have.any",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "contains.any(this, arguments)"
},
{
	"path": "have.any.keys",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "contains.any(Object.keys(this), arguments)"
},
{
	"path": "have.all",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "contains.all(this, arguments)"
},
{
	"path": "have.all.keys",
	"msg": "",
	"not": "",
	"params": "",
	"cond": "contains.all(Object.keys(this), arguments)"
},
{
	"path": "have.length",
	"msg": "",
	"not": "",
	"params": "bound",
	"cond": "this.length == bound"
},
{
	"path": "have.length.lessThan",
	"msg": "",
	"not": "",
	"params": "bound",
	"cond": "this.length < bound"
},
{
	"path": "have.length.greaterThan",
	"msg": "",
	"not": "",
	"params": "bound",
	"cond": "this.length > bound"
},
{
	"path": "have.length.within",
	"msg": "",
	"not": "",
	"params": "low, high",
	"cond": "this.length <= high && this.length >= low"
},
{
	"path": "have.property",
	"msg": "",
	"not": "",
	"params": "key, value",
	"cond": "this[key] == value"
},
{
	"path": "have.ownProperty",
	"msg": "",
	"not": "",
	"params": "key",
	"cond": "key in this"
},
{
	"path": "have.deepProperty",
	"msg": "",
	"not": "",
	"params": "key, value",
	"cond": "deep.prop(this,key,value)"
},
{
	"path": "contain",
	"msg": "Substring is not present in value:\n\tValue: $$$,\n\tSubstring: $$$",
	"not": "Substring is present in value:\n\tValue: $$$,\n\tSubstring: $$$",
	"params": "needle",
	"cond": "this.indexOf(needle) >= 0"
}];