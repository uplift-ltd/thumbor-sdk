import { sign } from "../src/sign";

const SECURITY_KEY = "MY-SECURITY-KEY";

describe("sign", () => {
  it("should match signature", () => {
    const hash = sign("/some/my-img.jpg", SECURITY_KEY);

    expect(hash).toEqual("8uH_JrE-IsRMgjn9QD-V3pEdIms=");
  });
});
