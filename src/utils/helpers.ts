/**
 * Calculate years of experience from a start date to the current date
 * @param year - Start year
 * @param month - Start month (1-12)
 * @param day - Start day (default: 1)
 * @returns Number of full years
 */
export const calculateYearsOfExperience = (
  year: number,
  month: number,
  day: number = 1
): number => {
  const startDate = new Date(year, month - 1, day) // month is 0-indexed
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
  return diffYears
}
