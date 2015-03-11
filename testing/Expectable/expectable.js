(function() {
    var deepEqual = function(a, b) {
        if (a===b) {
            return true
        }
        if (a == b) {
            return true;
        }
        if (typeof a !=  typeof b) {
            return false;
        }
        var type = typeof a;
        if (type == "function") {
            return true;
        }
        if (!deepEqual(Object.keys(a),Object.keys(b))) {
            return false
        }
        var aIsArray = a instanceof Array;
        var bIsArray = b instanceof Array;
        if ((aIsArray && !bIsArray) || (!aIsArray && bIsArray)) {
            return false;
        }
        if (aIsArray && bIsArray) {
            if (a.length != b.length) {
                return false;
            }
            var length = a;
            for (var x = 0; x < a; x++) {
                if (!deepEqual(a[x], b[x])) {
                    return false;
                }
            }
        } else {
            var keys = Object.keys(a);
            while(keys.length > 0) {
                var key = keys.shift();
                if (!deepEqual(a[key],b[key])) {
                    return false;
                }
            }
        }
        return true;
    }
    var deepProp = function(obj, key, value) {
        var steps = key.split(".");
        var temp = obj;
        while (steps.length > 0) {
            var step = steps.shift();
            if (!(step in temp)) {
                return false;
            }
            temp = temp[step];
        }
        return deepEqual(temp, value);
    }
	var deep = {
		eq:deepEqual,
		prop:deepProp,
	}
    var needleFilter = function(haystack) {
        return function(needle) {
            return haystack.indexOf(needle) >= 0;
        }
    }
	var contains = {
		all:function(haystack, needles) {
			return needles.filter(needleFilter(haystack)).length == needles.length;
		},
		any:function(haystack, needles) {
			return needles.filter(needleFilter(haystack)).length == needles.length;
		}
	}
	var raw = expecting.map(function(spec){
		var obj = {};
		eval("obj.fn = function("+spec.params+"){return "+spec.cond+"};")
		return {
			path:spec.path,
			msg:spec.msg,
			not:spec.not,
			fn:obj.fn
		};
	});
    var argsToArray = function(args) {
        var out = [];
        for (var x = 0; x < args.length; x++) {
            out.push(args[x]);
        }
        return out;
    }
    var publish = function(message,vars) {
        var fields = message.split("$$$");
        var length = Math.max(fields.length, vars.length);
        var out = [];
        for (var x = 0; x < length; x++) {
            if (fields[x]) {
                out.push(fields[x]);
            }
            if (vars[x]) {
                out.push(vars[x]);
            }
        }
        return out.join("");
    }
	var build = function(root,label,cond,actual) {
		return function(spec) {
			var path = spec.path.split(".");
			var name = path.pop();
			var temp = root;
			path.forEach(function(step){
				temp[step] = temp[step] || {};
				temp = temp[step];
			});
			var fn = function() {
				if (cond == spec.fn.apply(actual,arguments)) {
					throw new Error(publish(spec[label],[].concat(actual,argsToArray(arguments))));;
				}
			};
			if (typeof temp[name] == 'object') {
				Object.keys(temp[name]).forEach(function(key){
					fn[key] = temp[name][key];
				});
			}
			temp[name] = fn;
		};
	};
	this.expect = function(actual) {
        var to = {};
        var not = {};
        raw.forEach(build(to,"msg",false,actual));
        raw.forEach(build(not,"not",true,actual));
        to.not = not;
        return {to:to};
	}
})()