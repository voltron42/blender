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
		depObj = depObj || {}
		var service = register[name];
		return service.init(service.deps.map(function(dep) {
			return depObj[dep];
		}))
	}
	this.registry = {
		apply:apply,
		invoke:invoke
	}
})()