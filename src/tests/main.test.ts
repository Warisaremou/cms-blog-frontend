import { formateDate } from "@/lib/utils";
import { expect, test } from "vitest";

test("should format date to string", () => {
  expect(formateDate(new Date("2021-10-10"))).toBe("10 October, 2021");
});
