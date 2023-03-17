import { buildUrl } from "../src/url";

describe("url", () => {
  it("should match metadata", () => {
    const url = buildUrl("/some/my-img.png", {
      metadata: true,
    });

    expect(url).toEqual("/meta/some/my-img.png");
  });

  it("should match width", () => {
    const url = buildUrl("/some/my-img.png", {
      width: 300,
    });

    expect(url).toEqual("/300x0/some/my-img.png");
  });

  it("should match height", () => {
    const url = buildUrl("/some/my-img.png", {
      height: 300,
    });

    expect(url).toEqual("/0x300/some/my-img.png");
  });

  it("should match trim", () => {
    const url = buildUrl("/some/my-img.png", {
      trim: true,
    });

    expect(url).toEqual("/trim/some/my-img.png");
  });

  describe("crop", () => {
    it("should match crop string", () => {
      const url = buildUrl("/some/my-img.png", {
        crop: "1x2:3x4",
      });

      expect(url).toEqual("/1x2:3x4/some/my-img.png");
    });

    it("should match crop number array", () => {
      const url = buildUrl("/some/my-img.png", {
        crop: [
          [1, 2],
          [3, 4],
        ],
      });

      expect(url).toEqual("/1x2:3x4/some/my-img.png");
    });

    it("should match crop string array", () => {
      const url = buildUrl("/some/my-img.png", {
        crop: ["1x2", "3x4"],
      });

      expect(url).toEqual("/1x2:3x4/some/my-img.png");
    });
  });

  describe("fit in", () => {
    it("should match fit in", () => {
      const url = buildUrl("/some/my-img.png", {
        fitIn: true,
      });

      expect(url).toEqual("/fit-in/some/my-img.png");
    });

    it("should match adaptive fit in", () => {
      const url = buildUrl("/some/my-img.png", {
        fitIn: "adaptive",
      });

      expect(url).toEqual("/adaptive-fit-in/some/my-img.png");
    });

    it("should match full fit in", () => {
      const url = buildUrl("/some/my-img.png", {
        fitIn: "full",
      });

      expect(url).toEqual("/full-fit-in/some/my-img.png");
    });
  });

  it("should match invertDimensions", () => {
    const url = buildUrl("/some/my-img.png", {
      invertDimensions: true,
      width: 300,
      height: 200,
    });

    expect(url).toEqual("/-300x200/some/my-img.png");
  });

  describe("horizontalAlign", () => {
    it("should match left horizontalAlign", () => {
      const url = buildUrl("/some/my-img.png", {
        horizontalAlign: "left",
      });

      expect(url).toEqual("/left/some/my-img.png");
    });

    it("should match center horizontalAlign", () => {
      const url = buildUrl("/some/my-img.png", {
        horizontalAlign: "center",
      });

      expect(url).toEqual("/center/some/my-img.png");
    });

    it("should match right horizontalAlign", () => {
      const url = buildUrl("/some/my-img.png", {
        horizontalAlign: "right",
      });

      expect(url).toEqual("/right/some/my-img.png");
    });
  });

  describe("verticalAlgn", () => {
    it("should match left verticalAlign", () => {
      const url = buildUrl("/some/my-img.png", {
        verticalAlign: "left",
      });

      expect(url).toEqual("/left/some/my-img.png");
    });

    it("should match center verticalAlign", () => {
      const url = buildUrl("/some/my-img.png", {
        verticalAlign: "center",
      });

      expect(url).toEqual("/center/some/my-img.png");
    });

    it("should match right verticalAlign", () => {
      const url = buildUrl("/some/my-img.png", {
        verticalAlign: "right",
      });

      expect(url).toEqual("/right/some/my-img.png");
    });
  });

  it("should match smart crop", () => {
    const url = buildUrl("/some/my-img.png", {
      smartCrop: true,
    });

    expect(url).toEqual("/smart/some/my-img.png");
  });

  describe("filters", () => {
    it("should match a filter with a single string argument", () => {
      const url = buildUrl("/some/my-img.png", {
        filters: {
          quality: "70%",
        },
      });

      expect(url).toEqual("/filters:quality(70%)/some/my-img.png");
    });

    it("should match a filter with a single number argument", () => {
      const url = buildUrl("/some/my-img.png", {
        filters: {
          quality: 1,
        },
      });

      expect(url).toEqual("/filters:quality(1)/some/my-img.png");
    });

    it("should match a filter with a single boolean argument", () => {
      const url = buildUrl("/some/my-img.png", {
        filters: {
          quality: true,
        },
      });

      expect(url).toEqual("/filters:quality(true)/some/my-img.png");
    });

    it("should match a filter with multiple arguments", () => {
      const url = buildUrl("/some/my-img.png", {
        filters: {
          quality: ["70%", 0, false],
        },
      });

      expect(url).toEqual("/filters:quality(70%,0,false)/some/my-img.png");
    });

    it("should match multiple filters with multiple arguments", () => {
      const url = buildUrl("/some/my-img.png", {
        filters: {
          quality: ["70%", 0, false],
          yolo: ["50%", 1, true],
        },
      });

      expect(url).toEqual(
        "/filters:quality(70%,0,false):yolo(50%,1,true)/some/my-img.png"
      );
    });
  });

  it("should match all", () => {
    const url = buildUrl("/some/my-img.png", {
      metadata: true,
      trim: true,
      crop: "1x2:3x4",
      fitIn: true,
      width: 1920,
      height: 1080,
      invertDimensions: true,
      horizontalAlign: "center",
      verticalAlign: "center",
      smartCrop: true,
      filters: {
        quality: "75%",
      },
    });

    expect(url).toEqual(
      "/meta/trim/1x2:3x4/fit-in/-1920x1080/center/center/smart/filters:quality(75%)/some/my-img.png"
    );
  });
});
