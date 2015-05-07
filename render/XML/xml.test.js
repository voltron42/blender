describe("XML", function() {
  var pr = function(str) {
    return str.split("<").join("&lt;").split(">").join("&gt;");
  }
  var verify = function(obj, xml) {
    expect(pr(new XML(obj,true).toString())).to.equal(pr(xml));
  }
  var noteError = function(obj, message) {
    expect(function() {
      new XML(obj,true).toString();
    }).to.error(message);
  }
  it("name only", function() {
    verify({
      name:"hr"
    }, "<hr/>")
  });
  it("name and child name", function() {
    verify({
      name:"ul",
      children:[{
        name:"li"
      }]
    },"<ul><li/></ul>");
  });
  it("name and text child", function() {
    verify({
      name:"text",
      children:["string"]
    }, "<text>string</text>");
  })
  it("name and string attr", function() {
    verify({
      name:"x",
      attrs:{
        b:"c",
      }
    },'<x b="c"/>');
  });
  it("name and number attr", function() {
    verify({
      name:"x",
      attrs:{
        d:4,
      }
    },'<x d="4"/>');
  });
  it("name and bool attrs", function() {
    verify({
      name:"x",
      attrs:{
        a:false,
        b:true,
      }
    },'<x a="false" b="true"/>');
  });
  it("obj attr", function() {
    verify({
      name:"a",
      attrs:{
        b:{}
      }
    },'<a b="{}"/>');
  });
  it("name and child with attrs", function() {
    verify({
      name:"x",
      children:[{
        name:"b",
        attrs:{
          c:"d",
          d:true,
          f:4
        }
      }]
    },'<x><b c="d" d="true" f="4"/></x>');
  });
  it("no name", function() {
    noteError({},"XML name must be a string.");
  });
  it("child with no name", function() {
    noteError({
      name:"a",
      children:[{}]
    },"XML name must be a string.");
  });
  it("empty name", function() {
    noteError({
      name:""
    },"XML string must contain characters.");
  });
  it("attrs not object", function() {
    noteError({
      name:"a",
      attrs:true
    },"XML attributes must be an object.");
  });

});
