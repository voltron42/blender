(function(){
	var regex = /\$(\$|([=\\?!][a-z][a-z]*((\.[_a-zA-Z][_a-zA-Z0-9]*)|\[([0-9]|('[a-z\s$]+'))\])*))\$/g;
	var parse = function(template) {
		var tokens = [];
		var index = 0;
		var check = function() {
			var match = arguments[0];
			var offset = arguments[arguments.length - 2];
			var step = template.substring(index,offset);
			if (step.length > 0 ) {
				tokens.push(step);
			}
			tokens.push({
				tpl:match,
				type:match[1]
			});
			index = offset + match.length;
			return match;
		}
		template.replace(regex, check);
		var last = template.substr(index);
		if (last.length > 0) {
			tokens.push(last);
		}
		return tokens;
	}
	var Parser = function(template) {
		this.tokens = parse(template);
		var index = 0;
		this.hasNext = function() {
			return index < this.tokens.length;
		}
		this.next = function() {
			return this.tokens[index++];
		}
		this.length = function() {
			return this.tokens.length;
		}
	}
	var CompositeTemplate = function(list) {
  	this.list = list;
		this.apply = function(data) {
			return list.map(function(template) {
				return template.apply(data);
			}).join("");
		}
	}
	var ExpressionTemplate = function(token) {
		this.expression = token.substring(2,token.length-1);
		var fn;
		eval("fn = function(_$, _index, _parent) {return _$."+this.expression+";}");
		this.apply = fn;
	}
	var StringTemplate = function(strval) {
  	this.value = strval
		this.apply = function() {
			return strval;
		}
	}
	var ConditionalTemplate = function(token, parser) {
		this.exp = new ExpressionTemplate(token);
		this.list = buildFromList(parser);
		this.apply = function(data,index,parent) {
			if (this.exp.apply(data,index,parent)) {
				return this.list.apply(data,index,parent);
			} else {
				return "";
			}
		}
	}
	var LoopTemplate = function(token, parser) {
		this.exp = new ExpressionTemplate(token);
		this.list = buildFromList(parser);
		this.apply = function(data,index,parent) {
			var collection = this.exp.apply(data,index,parent);
			if (typeof collection == "object") {
				var _parent = {
					data:data
				}
				if (parent) {
					_parent.parent = parent;
				}
				if (collection instanceof Array) {
					return collection.map(function(child, index) {
						return this.list.apply(child, index, _parent);
					}).join("");
				} else {
					return Object.keys(collection).map(function(key) {
						return this.list.apply(collection[key], key, _parent);
					}).join("");
				}
			} else {
				return collection;
			}
		}
	}
	var buildFromSingle = function(parser) {
		var token = parser.next();
		if (typeof token == "string") {
			return new StringTemplate(token);
		} else if (typeof token == "object") {
			if (token.type == "=") {
				return new ExpressionTemplate(token.tpl);
			} else if (token.type == "?") {
				return ConditionalTemplate(token.tpl, parser);
			} else if (token.type == "!") {
				return LoopTemplate(token.tpl, parser);
			} else if (token.type == "$") {
				return;
			} else {
				throw new Error("invalid token type");
			}
		} else {
			throw new Error("Invalid token present");
		}
		return false;
	}
	var buildFromList = function(parser) {
		var list = [];
		while(parser.hasNext()) {
			var single = buildFromSingle(parser);
			if (!single) {
				break;
			}
			list.push(single);
		}
		return new CompositeTemplate(list);
	}
	var buildFrom = function(parser) {
		if (parser.length() > 1) {
			var build = buildFromList(parser);
			if (parser.hasNext()) {
				throw new Error("invalid termination");
			}
			return build;
		} else if (parser.length() == 1){
			return buildFromSingle(parser);
		} else {
			return new StringTemplate("");
		}
	}
	var compileTemplate = function(tplstr) {
  	console.log("compiling");
  	console.log(tplstr);
  	var parser = new Parser(tplstr);
  	console.log(parser);
  	var template = buildFrom(parser);
  	console.log(template);
  	console.log("");
		return template;
	}
	this.Mint = this.Mint || {};
	this.Mint.compile = compileTemplate;
})()