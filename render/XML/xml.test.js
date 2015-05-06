describe("XML", function() {
  it("name only", function() {
    var br = new XML({
      name:"hr"
    });
    expect(br.toString()).to.equal("<hr/>");
  });
  it("name and child name", function() {
    var ul = new XML({
      name:"ul",
      children:[{
        name:"li"
      }]
    });
    expect(ul.toString()).to.equal("<ul><li/></ul>");
  });
  it("name and text child", function() {
    expect(new XML({
      name:"text",
      children:["string"]
    }).toString()).to.equal("<text>string</text>")
  })
  it("name and attrs", function() {
    var node = new XML({
      name:"x",
      attrs:{
        b:"c",
        d:4,
        f:true
      }
    },true);
    console.log(node.toString());
    expect(node.toString()).to.equal('<x b="c" d="4" f="true"/>');
  });
  it("name and child with attrs", function() {
    var node = new XML({
      name:"x",
      children:[{
        name:"b",
        attrs:{
          c:"d",
          d:true,
          f:4
        }
      }]
    },true);
    console.log(node.toString());
    expect(node.toString()).to.equal('<x><b c="d" d="true" f="4"/></x>');
  });
  it("no name", function() {
    expect(function() {
      new XML({}).toString()
    }).to.error("XML name must be a string.");
  });
  it("child with no name", function() {
    expect(function() {
      new XML({
        name:"a",
        children:[{}]
      }).toString();
    }).to.error("XML name must be a string.");
  });
  it("empty name", function() {
    expect(function() {
      new XML({name:""}).toString()
    }).to.error("XML string must contain characters.");
  });
  it("attrs not object", function() {
    expect(function() {
      new XML({
        name:"a",
        attrs:true
      }).toString();
    }).to.error("XML attributes must be an object.");
  });
  it("bad attribute", function() {
    expect(function() {
      new XML({
        name:"a",
        attrs:{
          b:{}
        }
      }).toString();
    }).to.error("XML attributes must be primitives.");
  });

});
