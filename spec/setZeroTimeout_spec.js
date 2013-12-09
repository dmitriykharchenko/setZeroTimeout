describe("set zero timeout spec", function(){
  describe("prove that it is acynchronus", function(){

    it("should call handler later than next line operation", function(){
      var result = "handler_not_called";

      setZeroTimeout(function(){
        result = "handler_called"
      });

      expect(result).toBe("handler_not_called");
    });


    it("should call handler", function(){
      var result = "handler_not_called";

      setZeroTimeout(function(){
        result = "handler_called"
      });

      waits(1);

      runs(function(){
        expect(result).toBe("handler_called");
      });
    });


    it("should call bunch of handlers", function(){
      var count = 0;

      setZeroTimeout(function(){
        count += 1;
      });

      setZeroTimeout(function(){
        count += 1;
      });

      setZeroTimeout(function(){
        count += 1;
      });

      setZeroTimeout(function(){
        count += 1;
      });

      setZeroTimeout(function(){
        count += 1;
      });

      setZeroTimeout(function(){
        count += 1;
      });

      waits(1);

      runs(function(){
        expect(count).toBe(6);
      });
    });
  });
});