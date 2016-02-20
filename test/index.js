var chai = require('chai'),
    spies = require('chai-spies'),
    calc = require('..');


chai.use(spies);
var expect = chai.expect;

describe('unit', function() {
  describe('calculate(..)', function() {
    var calculate = calc.calculate;
    
    it('should add two numbers if op is +', function(done) {
      expect(calculate(1, '+', 1)).to.equal(2);
      done();
    });
    
    it('should subtract two numbers if op is -', function(done) {
      expect(calculate(2, '-', 1)).to.equal(1);
      done();
    });
    
    it("should throw if op is unknown", function (done) {
      var msg = "invalid";
      expect(function() {calculate(2, 'l', 1);}).to.throw(msg);
      done();
    });
  });

  describe('cli', function() {
    describe('stringToNumber(..)', function() {
      stringToNumber = calc.stringToNumber;
      
      it("can convert a postive integer string to number", function (done) {
        expect(stringToNumber('25')).to.equal(25);
        done();
      });
      
      it("can convert a negative integer string to number", function (done) {
        expect(stringToNumber('-25')).to.equal(-25);
        done();
      });
      
      it("can convert a float string to number", function (done) {
        expect(stringToNumber('25.25')).to.equal(25.25);
        done();
      });
      
      it("can convert a negative float string to number", function (done) {
        expect(stringToNumber('-25.25')).to.equal(-25.25);
        done();
      });
      
      it("will fail with an error in case the number string is not a number", function (done) {
        expect(function() {stringToNumber('foo');}).to.throw(/'.*?' is not a number/);
        done();
      });
    });
    
    describe("parseArguments(..)", function () {
      var parse = calc.parseArguments;
      var convert = calc.stringToNumber;

      it("should accept three arguments only", function (done) {
        function callParse() {parse(['foo', 'bar'], null);}
        expect(callParse).to.throw("need three arguments: number operand number");
        done();
      });
      
      it("should tell if the first argument is not a number", function (done) {
        function callParse() {parse(['foo', 'op', '5'], convert);}
        expect(callParse).to.throw("argument 1 must be a number");
        done();
      });
      
      it("should tell if the second argument is not a number", function (done) {
        function callParse() {parse(['6', 'op', 'foo'], convert);}
        expect(callParse).to.throw("argument 3 must be a number");
        done();
      });
      
      it("should return arguments in order, with converted numbers", function (done) {
        expect(parse(['6.3', 'op', '3.5'], convert)).to.eql([6.3, 'op', 3.5]);
        done();
      });
    });
  });  
});

describe("integration", function () {
  describe("main(..)", function () {
    var main = calc.main;
    
    it("should parse arguments and call a handler with them", function () {
      var parse = chai.spy(function () {
        return [42];
      });
      var handler = chai.spy();
      var noopStream = {write: function(){}};
      
      main(['program', 'script', 'anything', 'really'], parse, handler, null, noopStream);
      expect(parse).to.have.been.called.with(['anything', 'really']);
      expect(handler).to.have.been.called.with([42]);
    });
    
    it("should write error result to error stream and return error code", function (done) {
      function parse() {throw new Error("no can do");}
      var errStream = {write: chai.spy()};
      var code = main(['node', 'foo'], parse, null, errStream);
      
      expect(errStream.write).to.have.been.called.with("no can do\n");
      expect(code).to.equal(1);
      done();
    });
    
    it("should write result to result stream", function (done) {
      var stream = {write: chai.spy()};
      function noop() {}
      function handler() { return 42; }
      var code = main(['whatever'], noop, handler, null, stream);
      
      expect(stream.write).to.have.been.called.with("42\n");
      expect(code).to.equal(0);
      done();
    });
  });
});
