(function() {
	var register = {};
	var apply = function(name, deps, init) {
		deps = deps || [];
		register[name] = {
			deps:deps,
			init:init
		}
	}
	var invoke = function(name,depObj) {
		depObj = depObj || {};
		if (!(name in register)) {
			throw new Error(name + " invalid service name");
		}
		var service = register[name];
		var fullDeps = service.deps.map(function(dep) {
			return depObj[dep];
		})
		var retVal = service.init(fullDeps)
		return retVal;
	}
	this.registry = {
		apply:apply,
		invoke:invoke
	}
})()