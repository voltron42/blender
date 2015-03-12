var expecting = [{
	"path": "equal",
	"msg": "Values are not equal:\n\tActual: $0$,\n\tExpected: $1$",
	"not": "Values are equal:\n\tActual: $0$,\n\tExpected: $1$",
	"params": "expected",
	"cond": "this == expected"
},
{
	"path": "deepEqual",
	"msg": "Values are not equal:\n\tActual: $0$,\n\tExpected: $1$",
	"not": "Values are equal:\n\tActual: $0$,\n\tExpected: $1$",
	"params": "expected",
	"cond": "deep.eq(this,expected)"
},
{
	"path": "exist",
	"msg": "Value does not exist!",
	"not": "Value exists:\n\tValue:$0$",
	"params": "",
	"cond": "this != undefined && this != null && this != global()"
},
{
	"path": "match",
	"msg": "Values does not match pattern:\n\tValue: $0$,\n\tPattern: $1$",
	"not": "Values matches pattern:\n\tValue: $0$,\n\tPattern: $1$",
	"params": "regex",
	"cond": "new RegExp(regex).test(this)"
},
{
	"path": "be",
	"msg": "Values are not strictly equal:\n\tActual: $0$,\n\tExpected: $1$",
	"not": "Values are strictly equal:\n\tActual: $0$,\n\tExpected: $1$",
	"params": "expected",
	"cond": "this === expected"
},
{
	"path": "be.a",
	"msg": "Values does not match type:\n\tValue: $0$,\n\tType: $1$",
	"not": "Values matches type:\n\tValue: $0$,\n\tType: $1$",
	"params": "type",
	"cond": "typeof this == type"
},
{
	"path": "be.anInstanceOf",
	"msg": "Values is not an instance of constructor",
	"msg": "Values is an instance of constructor",
	"params": "constructor",
	"cond": "this instanceof constructor"
},
{
	"path": "be.undefined:",
	"msg": "Value is not undefined:\n\tValue:$0$",
	"not": "Value is undefined!",
	"params": "",
	"cond": "typeof this == 'undefined' && this != global()"
},
{
	"path": "be.null",
	"msg": "Value is not null:\n\tValue:$0$",
	"not": "Value is null!",
	"params": "",
	"cond": "this == null"
},
{
	"path": "be.ok",
	"msg": "Value is not truthy:\n\tValue:$0$",
	"not": "Value is truthy:\n\tValue:$0$",
	"params": "",
	"cond": "this?true:false"
},
{
	"path": "be.empty",
	"msg": "Value is not empty:\n\tValue:$0$",
	"not": "Value is empty:\n\tValue:$0$",
	"params": "",
	"cond": "(((this instanceof Array) || typeof this == 'string')&& this.length == 0) || (typeof this == 'object' && Object.keys(this).length == 0)"
},
{
	"path": "be.true",
	"msg": "Value is not true:\n\tValue:$0$",
	"not": "Value is true:\n\tValue:$0$",
	"params": "",
	"cond": "this === true"
},
{
	"path": "be.false",
	"msg": "Value is not false:\n\tValue:$0$",
	"not": "Value is false:\n\tValue:$0$",
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