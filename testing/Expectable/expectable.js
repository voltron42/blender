(function() {
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
	var raw = expecting.map(function(spec){
		return {
			path:spec.path,
			msg:spec.msg,
			not:spec.not,
			fn:eval("function("+spec.params+"){return "+spec.cond+"};")
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
        var fields = messae.split("$$$");
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
	var build = function(root,label,actual) {
		return function(spec) {
			var path = spec.path.split(".");
			var name = path.pop();
			var temp = root;
			path.forEach(function(step){
				temp[step] = temp[step] || {};
				temp = temp[step];
			});
			var fn = function() {
				if (!spec.fn.apply(actual,arguments)) {
					throw new Error(publish(spec[label],[].concat(actual,argsToArray(arguments))));
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
        raw.forEach(build(to,"msg",actual));
        raw.forEach(build(not,"not",actual));
        to.not = not;
        return to;
	}
})()