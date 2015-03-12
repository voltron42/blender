var expecting = [{
	"path": "equal",
	"msg": "Values are not equal:\n\tActual: $0$,\n\tExpected: $1$",
	"not": "Values are equal:\n\tActual: $0$,\n\tExpected: $1$",
	"params": "expected",
	"cond": "actual == expected"
},
{
	"path": "deepEqual",
	"msg": "Values are not equal:\n\tActual: $0$,\n\tExpected: $1$",
	"not": "Values are equal:\n\tActual: $0$,\n\tExpected: $1$",
	"params": "expected",
	"cond": "deep.eq(actual,expected)"
},
{
	"path": "exist",
	"msg": "Value does not exist!",
	"not": "Value exists:\n\tValue:$0$",
	"params": "",
	"cond": "actual != undefined && actual != null"
},
{
	"path": "match",
	"msg": "Value does not match pattern:\n\tValue: $0$,\n\tPattern: $1$",
	"not": "Value matches pattern:\n\tValue: $0$,\n\tPattern: $1$",
	"params": "regex",
	"cond": "new RegExp(regex).test(actual)"
},
{
	"path": "be",
	"msg": "Values are not strictly equal:\n\tActual: $0$,\n\tExpected: $1$",
	"not": "Values are strictly equal:\n\tActual: $0$,\n\tExpected: $1$",
	"params": "expected",
	"cond": "actual === expected"
},
{
	"path": "be.a",
	"msg": "Values does not match type:\n\tValue: $0$,\n\tType: $1$",
	"not": "Values matches type:\n\tValue: $0$,\n\tType: $1$",
	"params": "type",
	"cond": "typeof actual === type"
},
{
	"path": "be.anInstanceOf",
	"msg": "Values is not an instance of constructor",
	"msg": "Values is an instance of constructor",
	"params": "constructor",
	"cond": "actual instanceof constructor"
},
{
	"path": "be.undefined",
	"msg": "Value is not undefined:\n\tValue:$0$",
	"not": "Value is undefined!",
	"params": "",
	"cond": "typeof actual == 'undefined'"
},
{
	"path": "be.null",
	"msg": "Value is not null:\n\tValue:$0$",
	"not": "Value is null!",
	"params": "",
	"cond": "actual == null"
},
{
	"path": "be.ok",
	"msg": "Value is not truthy:\n\tValue:$0$",
	"not": "Value is truthy:\n\tValue:$0$",
	"params": "",
	"cond": "actual?true:false"
},
{
	"path": "be.empty",
	"msg": "Value is not empty:\n\tValue:$0$",
	"not": "Value is empty:\n\tValue:$0$",
	"params": "",
	"cond": "(((actual instanceof Array) || typeof actual == 'string')&& actual.length == 0) || (typeof actual == 'object' && Object.keys(actual).length == 0)"
},
{
	"path": "be.true",
	"msg": "Value is not true:\n\tValue:$0$",
	"not": "Value is true:\n\tValue:$0$",
	"params": "",
	"cond": "actual === true"
},
{
	"path": "be.false",
	"msg": "Value is not false:\n\tValue:$0$",
	"not": "Value is false:\n\tValue:$0$",
	"params": "",
	"cond": "actual === false"
},
{
	"path": "be.lessThan",
	"msg": "Value is not less than bound:\n\tValue:$0$\n\tBound:$1$",
	"not": "Value is less than bound:\n\tValue:$0$\n\tBound:$1$",
	"params": "bound",
	"cond": "actual < bound"
},
{
	"path": "be.greaterThan",
	"msg": "Value is not greater than bound:\n\tValue:$0$\n\tBound:$1$",
	"not": "Value is greater than bound:\n\tValue:$0$\n\tBound:$1$",
	"params": "bound",
	"cond": "actual > bound"
},
{
	"path": "be.within",
	"msg": "Value is not within bounds:\n\tValue:$0$\n\tLow Bound:$1$\n\tHigh Bound:$2$",
	"not": "Value is within bounds:\n\tValue:$0$\n\tLow Bound:$1$\n\tHigh Bound:$2$",
	"params": "low, high",
	"cond": "actual <= high && value >= low"
},
{
	"path": "have.any",
	"msg": "",
	"not": "",
	"params": "values",
	"cond": "contains.any(actual, values)"
},
{
	"path": "have.any.keys",
	"msg": "",
	"not": "",
	"params": "keys",
	"cond": "contains.any(Object.keys(actual), keys)"
},
{
	"path": "have.all",
	"msg": "",
	"not": "",
	"params": "values",
	"cond": "contains.all(actual, values)"
},
{
	"path": "have.all.keys",
	"msg": "",
	"not": "",
	"params": "keys",
	"cond": "contains.all(Object.keys(actual), keys)"
},
{
	"path": "have.length",
	"msg": "",
	"not": "",
	"params": "bound",
	"cond": "actual.length == bound"
},
{
	"path": "have.length.lessThan",
	"msg": "",
	"not": "",
	"params": "bound",
	"cond": "actual.length < bound"
},
{
	"path": "have.length.greaterThan",
	"msg": "",
	"not": "",
	"params": "bound",
	"cond": "actual.length > bound"
},
{
	"path": "have.length.within",
	"msg": "",
	"not": "",
	"params": "low, high",
	"cond": "actual.length <= high && actual.length >= low"
},
{
	"path": "have.property",
	"msg": "",
	"not": "",
	"params": "key, value",
	"cond": "actual[key] == value"
},
{
	"path": "have.ownProperty",
	"msg": "",
	"not": "",
	"params": "key",
	"cond": "key in actual"
},
{
	"path": "have.deepProperty",
	"msg": "",
	"not": "",
	"params": "key, value",
	"cond": "deep.prop(actual,key,value)"
},
{
	"path": "contain",
	"msg": "Substring is not present in value:\n\tValue: $0$,\n\tSubstring: $1$",
	"not": "Substring is present in value:\n\tValue: $0$,\n\tSubstring: $1$",
	"params": "needle",
	"cond": "actual.indexOf(needle) >= 0"
}];