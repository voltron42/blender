(function(){
    var verify = function(obj) {
        if (typeof obj.name != "string") {
            throw new Error("XML name must be a string.");
        }
        if (obj.name.length <= 0) {
            throw new Error("XML string must contain characters.");
        }
        if (typeof obj.attrs != "object") {
            throw new Error("XML attributes must be an object.");
        }
        if (!(obj.children instanceof Array)) {
            console.log(obj)
            throw new Error("XML children must be an array");
        }
        if (obj.children.filter(function(child) {
            return typeof child != "string" && typeof child != "object" && typeof child != "number" && typeof child != "boolean";
        }).length > 0) {
            throw new Error("XML children must either be an XML object or a string.");
        }
    }
    var toAttr = function(value) {
      if (typeof value == "object") {
        if (value instanceof Array) {
          return value.map(toAttr).join(",")
        } else {
          return JSON.stringify(value);
        }
      } else if (typeof value == "boolean") {
        return value?"true":"false";
      } else {
        return value;
      }
    }
    var toXML = function(obj, useQuotes) {
        var node = {
          name:obj.name,
          attrs:(obj.attrs||{}),
          children:(obj.children||[])
        }
  	    verify(node)
        var out = ["<",node.name];
        Object.keys(node.attrs).filter(function(key) {
            return typeof node.attrs[key] != 'undefined';
        }).forEach(function(key){
            out = [].concat(out," ",key,"=",(useQuotes?'"':""),toAttr(node.attrs[key]),(useQuotes?'"':""));
        })
        if (node.children.length <= 0 && useQuotes) {
            out.push("/>")
        } else {
        		out.push(">");
        		out = out.concat(node.children.map(function(child){
          			if (typeof child == "string") {
          				    return child;
          			} else if (typeof child == "object") {
          				    return toXML(child, useQuotes);
          			} else {
          				    return "";
          			}
        		}))
        		out = out.concat("</",node.name,">")
        }
        return out.join("");
    }
    var XML = function(obj, useQuotes) {
        this.name = obj.name;
        this.attrs = obj.attrs;
        this.children = obj.children;
        this.toString = function() {
            return toXML(this, useQuotes);
        }
    }
    this.XML = XML;
})();
