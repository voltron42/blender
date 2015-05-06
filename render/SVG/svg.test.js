describe("SVG", function() {
  it("rect", function() {
    expect(SVG.rect(2,3,4,5,{
      a:true
    }).getXML()).to.deepEqual({
      name:"rect",
      attrs:{
        x:2,
        y:3,
        width:4,
        height:5,
        "stroke-width":1,
        a:true
      }
    });
  });
  it("circle", function() {
    expect(SVG.circle(4,3,2,{
      a:5
    }).getXML()).to.deepEqual({
      name:"circle",
      attrs:{
        cx:4,
        cy:3,
        r:2,
        a:5
      }
    });
  });
  it("text", function() {
    expect(SVG.text("a",5,6,"","",{
      c:7
    }).getXML()).to.deepEqual({
      name:"text",
      attrs:{
        x:5,
        y:6,
        "text-anchor":"middle",
        "alignment-baseline":"central",
        c:7
      },
      children:["a"]
    });
  });
  it("link", function() {
    expect(SVG.link("This is the path.",{
      c:7
    },[SVG.circle(1,2,3)]).getXML()).to.deepEqual({
      name:"a",
      attrs:{
        "xlink:href":"This is the path.",
        c:7
      },
      children:[{
        name:"circle",
        attrs:{
          cx:1,
          cy:2,
          r:3
        }
      }]
    });
  });
  it("svg", function() {
    expect(SVG.svg(5,6,[SVG.circle(1,2,3)]).getXML()).to.deepEqual({
      name:"svg",
      attrs:{
        width:5,
        height:6
      },
      children:[{
        name:"circle",
        attrs:{
          cx:1,
          cy:2,
          r:3
        }
      }]
    });
  });
});
