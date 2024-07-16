const { Member } = require("../../src/models/member");

describe("Member Validation", () => {
  test("should validate a correct member", () => {
    const member = new Member({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password123!",
    });
    const result = member.validateMember();
    expect(result).toBe(true);
  });

  test("should invalidate a member with missing firstName", () => {
    const member = new Member({
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password123!",
    });
    const result = member.validateMember();
    expect(result).toBe(false);
  });

  test("should invalidate a member with invalid email", () => {
    const member = new Member({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe.com",
      password: "Password123!",
    });
    const result = member.validateMember();
    expect(result).toBe(false);
  });

  test("should invalidate a member with short password", () => {
    const member = new Member({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Pass1",
    });
    const result = member.validateMember();
    expect(result).toBe(false);
  });
});
