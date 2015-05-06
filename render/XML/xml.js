(function(){
    var verify = function(obj) {
		obj.attrs = obj.attrs || {};
		obj.children = obj.children || [];
		Object.keys(obj.attrs).forEach(function(key){
			obj.attrs[key] = obj.attrs[key] || "";
		})
        if (typeof obj.name != "string") {
            throw new Error("XML name must be a string.");
        }
        if (obj.name.length <= 0) {
            throw new Error("XML string must contain characters.");
        }
        if (typeof obj.attrs != "object") {
            throw new Error("XML attributes must be an object.");
        }
        if (Object.keys(obj.attrs).filter(function(key){
            return typeof obj.attrs[key] !=  "string" && typeof obj.attrs[key] !=  "number" && typeof obj.attrs[key] !=  "boolean";
        }).length > 0) {
            throw new Error("XML attributes must be primitives.");
        }
        if (!(obj.children instanceof Array)) {
            console.log(obj)
            throw new Error("XML children must be an array");
        }
        var deepErrors = obj.children.filter(function(child) {
            return typeof child == "object";
        }).map(function(child) {
            try {
                verify(child);
                return;
            } catch(e) {
                return e;
            }
        }).filter(function(err) {
            return err instanceof Error;
        });
        if (deepErrors.length > 0) {
            throw deepErrors[0];
        }
        if (obj.children.filter(function(child) {
            return typeof child != "string" && typeof child != "object" && typeof child != "number" && typeof child != "boolean";
        }).length > 0) {
            throw new Error("XML children must either be an XML object or a string.");
        }
    }
    var toXML = function(obj, useQuotes) {
  	    verify(obj)
        var out = ["<",obj.name];
        Object.keys(obj.attrs).forEach(function(key){
            out = [].concat(out," ",key,"=",(useQuotes?'"':""),obj.attrs[key],(useQuotes?'"':""));
        })
        if (obj.children.length <= 0) {
            out.push("/>")
        } else {
        		out.push(">");
        		out = out.concat(obj.children.map(function(child){
          			if (typeof child == "string") {
          				    return child;
          			} else if (typeof child == "object") {
          				    return toXML(child, useQuotes);
          			} else {
          				    return "";
          			}
        		}))
        		out = out.concat("</",obj.name,">")
        }
        return out.join("");
    }
    var XML = function(obj, useQuotes) {
        this.name = obj.name;
        obj.attrs = obj.attrs || {};
        obj.children = obj.children || [];
        this.attrs = obj.attrs;
        this.children = obj.children;
        this.toString = function() {
            return toXML(this, useQuotes);
        }
    }
    this.XML = XML;
})();
