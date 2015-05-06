(function(){
    var horizontal = { // text-anchor
        "left":"start",
        "middle":"middle",
        "right":"end"
    }
    var vertical = { // alignment-baseline
        "top":"text-before-edge",
        "bottom":"text-after-edge",
        "middle":"central"
    }
    var SvgElement = function(xmlObj) {
        this.getXML = function() {
            return xmlObj;
        }
        this.toString = function() {
            return new XML(xmlObj).toString();
        }
    }
  	var validateContents = function(contents) {
    		if (contents.filter(function(content) {
    			   return !(content instanceof SvgElement);
    		}).length > 0) {
    			   throw new Error("SVG can only contain SVG Elements");
    		}
  	}
    this.SVG = {
        rect:function(x,y,w,h,attrs) {
            return new SvgElement({
                name:"rect",
                attrs:{
                    x:x,
                    y:y,
                    width:w,
                    height:h,
                    "stroke-width":1
                }.merge(attrs)
            });
        },
        circle:function(x,y,r,attrs)  {
            return new SvgElement({
                name:"circle",
                attrs:{
                    cx:x,
                    cy:y,
                    r:r,
                }.merge(attrs)
            });
        },
        text:function(text,x,y,hAlign,vAlign,attrs)  {
            if (typeof text != "string") {
                text = "" + text;
            }
                text = text || "";
      			if (!horizontal[hAlign]) {
                hAlign = "middle"
      			}
      			if (!vertical[vAlign]) {
      			    vAlign = "middle"
      			}
            return new SvgElement({
                name:"text",
                attrs:{
                    x:x,
                    y:y,
                    "text-anchor":horizontal[hAlign],
                    "alignment-baseline":vertical[vAlign]
                }.merge(attrs),
                children:[text]
            });
        },
    		link:function(link,attrs,contents) {
      			validateContents(contents);
      			return new SvgElement({
                name:"a",
                attrs:{
                    "xlink:href":link,
                }.merge(attrs),
                children:contents.map(function(c) {
                    return c.getXML();
    				    })
            });
    		},
        svg:function(w,h,contents) {
      			validateContents(contents);
            return new SvgElement({
                name:"svg",
                attrs:{
                    width:w,
                    height:h
                },
                children:contents.map(function(c) {
                    return c.getXML();
	              })
            });
        }
    }
})();
