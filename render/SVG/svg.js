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
        var svg = new XML(xmlObj);
        this.getXML = function() {
            return xmlObj;
        }
        this.toString = function() {
            return svg.toString();
        }
    }
    this.SVG = {
        rect:function(x,y,w,h,attrs) {
            return new SvgElement({
                name:"rect",
                attrs:{
                    x:x,
                    y:y,
                    w:w,
                    h:h,
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
        svg:function(w,h,contents) {
			console.log("svg contents:");
			console.log(contents);
            if (contents.filter(function(content) {
                return !(content instanceof SvgElement);
            }).length > 0) {
                throw new Error("SVG can only contain SVG Elements");
            }
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
