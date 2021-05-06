import displayTime from "../logic/display-time";

describe("displayTime()", () => {
  test("should format times correctly", () => {
    expect(displayTime(123056)).toBe("02:03.05");
  });
});
