(function(){
	var regex = /\$(\$|([=\\?!][_a-zA-Z][_a-zA-Z0-9]*((\.[_a-zA-Z][_a-zA-Z0-9]*)|\[([_a-zA-Z0-9]+|('[a-z\s$]+'))\])*))\$/g;
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
		this.index = 0;
		this.hasNext = function() {
			return this.index < this.tokens.length;
		}
		this.next = function() {
			return this.tokens[this.index++];
		}
		this.length = function() {
			return this.tokens.length;
		}
	}
	var CompositeTemplate = function(list) {
		this.list = list;
		this.apply = function(data,index,parent) {
			return this.list.map(function(template) {
				return template.apply(data,index,parent);
			}).join("");
		}
	}
	var ExpressionTemplate = function(token) {
		this.expression = token.substring(2,token.length-1);
		var fn;
		if (this.expression[0] != '_') {
			this.expression = "_$." + this.expression;
		}
		eval("fn = function(_$, _index, _parent) {return "+this.expression+";}");
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
		var me = this;
		me.exp = new ExpressionTemplate(token);
		me.list = buildFromList(parser);
		me.apply = function(data,index,parent) {
			var collection = me.exp.apply(data,index,parent);
			if (typeof collection == "object") {
				var _parent = {
					data:data
				}
				if (parent) {
					_parent.parent = parent;
				}
				if (collection instanceof Array) {
					return collection.map(function(child, index) {
						return me.list.apply(child, index, _parent);
					}).join("");
				} else {
					return Object.keys(collection).map(function(key) {
						return me.list.apply(collection[key], key, _parent);
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
				return new ConditionalTemplate(token.tpl, parser);
			} else if (token.type == "!") {
				return new LoopTemplate(token.tpl, parser);
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
		var complete = false;
		while(parser.hasNext() && !complete) {
			var single = buildFromSingle(parser);
			if (single) {
				list.push(single);
			} else {
				complete = true;
			}
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
		var parser = new Parser(tplstr);
		var template = buildFrom(parser);
		return template;
	}
	this.Mint = this.Mint || {};
	this.Mint.compile = compileTemplate;
})()