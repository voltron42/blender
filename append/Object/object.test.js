describe("Object prototype extentions",function(){
    describe("apply function",function(){
        it("exclusive",function(){
            var obj = {a:1};
            obj.apply({b:2});
            expect(obj).to.deepEqual({a:1,b:2});
        });
        it("ignore", function(){
            var obj = {a:1};
            obj.apply({a:2});
            expect(obj).to.deepEqual({a:1});
        });
        it("override", function(){
            var obj = {a:1};
            obj.apply({a:2}, true);
            expect(obj).to.deepEqual({a:2});
        });
    });
    describe("copy", function(){
        it("shallow", function(){
            var obj = {a:1};
            var copy = obj.copy();
            expect(copy).to.deepEqual({a:2});
            copy.a = 2;
            expect(obj.a).to.equal(1);
        });
        it("deep",function(){
            var obj = {a:[]};
            var copy = obj.copy();
            expect(copy).to.deepEqual({a:[]});
            copy.a.push(5);
            expect(obj.a).to.have.length(1);
        });
    });
});


