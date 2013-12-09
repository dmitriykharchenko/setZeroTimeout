describe("set zero timeout spec", function(){
  describe("prove that is acynchronus", function(){
    it("should call handler later than next line operation", function(){
      var result = "handler_not_called";
      setZeroTimeout(function(){
        result = "handler_called"
      });
      expect(result).toBe("handler_not_called")
    });
  });
});