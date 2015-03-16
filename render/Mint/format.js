(function(){
	var argsToArray = function(args) {
        var out = [];
        for (var x = 0; x < args.length; x++) {
            out.push(args[x]);
        }
        return out;
    }
    var publish = function(message,vars) {
		message = message || "";
        return message.replace(/\$[0-9]+\$/g,function(match){
			var key = match.split("$").join("");
			if (!(key in vars)) {
				return key;
			}
            return JSON.stringify(vars[key]);
        })
    }
	var format = function() {
		var args = argsToArray(arguments);
		var tpl = args.shift();
		return publish(tpl,args);
	}
	this.Mint = this.Mint || {};
	this.Mint.format = format;
	if (this.appendStringFormat) {
		String.prototype.format = function() {
			return publish(this,argsToArray(arguments));
		}
	}
})()