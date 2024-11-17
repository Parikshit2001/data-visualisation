import { z } from "zod";

export const querySchema = z.object({
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "startDate must be a valid date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "endDate must be a valid date",
  }),
  ageGroup: z.enum(["15-25", ">25", "All"]).optional(),
  gender: z.enum(["Male", "Female", "All"]).optional(),
});

export const dataSchema = z.object({
  date: z.string().nonempty("Date field is required"),
  age: z.string().nonempty("Age field is required"),
  gender: z.string().nonempty("Gender field is required"),
  A: z.number().int().nonnegative(),
  B: z.number().int().nonnegative(),
  C: z.number().int().nonnegative(),
  D: z.number().int().nonnegative(),
  E: z.number().int().nonnegative(),
  F: z.number().int().nonnegative(),
});

export const genderSchema = z.enum(["Male", "Female", "All"]);
export const ageGroupSchema = z.enum(["15-25", ">25", "All"]);

export type Query = z.infer<typeof querySchema>;
export type Data = z.infer<typeof dataSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type AgeGroup = z.infer<typeof ageGroupSchema>;
