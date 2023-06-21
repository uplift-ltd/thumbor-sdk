import { Thumbor, UnsafeThumbor } from "../src/thumbor";

describe("thumbor", () => {
  describe("url", () => {
    it("should format a full url", () => {
      const thumbor = new Thumbor({
        endpoint: "http://localhost:8888",
        key: "MY-SECURITY-KEY",
      });

      const url = thumbor.url("/some/my-img.png", {
        width: 1920,
        height: 1080,
      });

      expect(url).toEqual(
        "http://localhost:8888/Huoc3kthH95DAsvoedAjQB3kleg=/1920x1080/some/my-img.png"
      );
    });
  });

  describe("sign", () => {
    it("should sign a url", () => {
      const thumbor = new Thumbor({
        endpoint: "http://localhost:8888",
        key: "MY-SECURITY-KEY",
      });

      const url = thumbor.sign("/some/my-img.png", {
        width: 1920,
        height: 1080,
      });

      expect(url).toEqual("Huoc3kthH95DAsvoedAjQB3kleg=");
    });
  });

  describe("no key", () => {
    expect(
      () =>
        // @ts-expect-error
        new Thumbor({
          endpoint: "http://localhost:8888",
        })
    ).toThrowError(
      "A key was not provided to Thumbor. Please use UnsafeThumbor on the frontend."
    );
  });
});

describe("unsafe thumbor", () => {
  describe("url", () => {
    it("should format a full url", () => {
      const thumbor = new UnsafeThumbor({
        endpoint: "http://localhost:8888",
      });

      const url = thumbor.url("/some/my-img.png", {
        width: 1920,
        height: 1080,
      });

      expect(url).toEqual(
        "http://localhost:8888/unsafe/1920x1080/some/my-img.png"
      );
    });
  });
});
