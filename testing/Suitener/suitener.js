(function(){
  var top = this;
  var labels =["describe","it","beforeEach","afterEach"];
  var setGlobal = function(scope) {
    var temp = {};
    labels.forEach(function(label) {
      temp[label] = top[label];
      top[label] = function() {
        scope[label].apply(scope, arguments);
      }
    });
    return temp;
  }
  var altGlobal = function(scope) {
    var temp = {};
    labels.forEach(function(label) {
      temp[label] = top[label];
      top[label] = function() {
        throw "Invalid operation: " + label;
      }
    });
    return temp;
  }
  var restore = function(temp) {
    labels.forEach(function(label) {
      top[label] = temp[label];
    });
  }
  var TestScope = function(path) {
    var prereqs = [];
    var postreqs = [];
    var log = {
      errorLog:[],
      testLog:[]
    };
    this.getLogs = function() {
      return log;
    }
    this.beforeEach = function(fn) {
      prereqs.push(fn);
    }
    this.afterEach = function(fn) {
      postreqs.push(fn);
    }
    this.describe = function(name, fn) {
      try {
        prereqs.forEach(function(fn) {
          fn();
        })
        var child = new TestScope(path.concat(name));
        var temp = setGlobal(child);
        try {
          fn();
        } catch (e) {
          child.err(e);
        } finally {
          childLog = child.getLogs();
          Object.keys(childLog).forEach(function(key){
            log[key] = log[key].concat(childLog[key]);
          });
          restore(temp);
        }
      } catch (e) {
        this.err(e);
      } finally {
        try {
          postreqs.forEach(function(fn) {
            fn();
          })
        } catch (e) {
          this.err(e);
        }
      }
    }
    this.it = function(name, fn) {
      var temp = setGlobal;
      setGlobal = altGlobal;
      log.testLog.push(path.concat(name));
      this.describe(name, fn);
      setGlobal = temp;
    }
    this.err = function(e) {
      if (!(e instanceof Error)) {
        e = new Error(e);
      }
      log.errorLog.push({
        path:path,
        error:{
          message:e.message,
          stack:e.stack,
          keys:Object.keys(e)
        }
      });
    }
  }
  var printResults = function(log) {
    var count = log.testLog.length;
    var fails = log.errorLog.length;
    var success = count - fails;
    log.stat = {
      count:count,
      fails:fails,
      success:success
    };
    console.log(JSON.stringify(log));
  }
  top.describe = function(name, fn) {
    var test = new TestScope([]);
    test.describe(name, fn);
    printResults(test.getLogs());
  }
})()




