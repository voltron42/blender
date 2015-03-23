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
        if (Object.keys(obj.attrs).filter(function(key){
            return typeof obj.attrs[key] !=  "string" && typeof obj.attrs[key] !=  "number" && typeof obj.attrs[key] !=  "boolean";
        }).length > 0) {
            throw new Error("XML attributes must be primitives.");
        }
        if (!(obj.children instanceof Array)) {
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
            return typeof child != "string" && typeof child != "object";
        }).length > 0) {
            throw new Error("XML children must either be an XML object or a string.");
        }
    }
    var toXML = function(obj) {
        var out = ["<",obj.name];
        Object.keys(obj.attrs).forEach(function(key){
            out = [].concat(out," ",key,"=",obj.attrs[key]);
        })
		out.push(">");
		out = out.concat(obj.children.map(function(child){
			if (typeof child == "string") {
				return child;
			} else if (typeof child) {
				return child.toString();
			} else {
				return "";
			}
		}))
		out = out.concat("</",obj.name,">")
        return out.join("");
    }
    var XML = function(obj) {
        this.name = obj.name;
        this.attrs = obj.attrs || {};
        this.children = obj.children || [];
        verify(this);
        
        this.toString = function() {
            return toXML(this);
        }
    }
    this.XML = XML;
})()