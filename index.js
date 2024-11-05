function calculateTotalTarget(startDate, endDate, totalAnnualTarget, daysToExclude = [5]) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];
    let totalTarget = 0;

    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      // Get the first and last day of the current month within the range
      const firstDayOfMonth = new Date(current.getFullYear(), current.getMonth(), 1);
      const lastDayOfMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0);
  
      // Adjust start and end dates if they are in the middle of the month
      const effectiveStartDate = (current.getFullYear() === start.getFullYear() && current.getMonth() === start.getMonth())
        ? start
        : firstDayOfMonth;
      const effectiveEndDate = (current.getFullYear() === end.getFullYear() && current.getMonth() === end.getMonth())
        ? end
        : lastDayOfMonth;
  
      // Count the total number of working days excluding specified days (like Fridays)
      let totalDaysInMonth = 0;
      let workedDaysInMonth = 0;
      for (let date = new Date(effectiveStartDate); date <= effectiveEndDate; date.setDate(date.getDate() + 1)) {
        if (!daysToExclude.includes(date.getDay())) { // If not a day to exclude
          totalDaysInMonth++;
          workedDaysInMonth++;
        }
      }
  
      // Store results for this month
      daysExcludingFridays.push(totalDaysInMonth);
      daysWorkedExcludingFridays.push(workedDaysInMonth);
  
      // Calculate monthly target based on worked days
      const monthlyTarget = (workedDaysInMonth / totalDaysInMonth) * (totalAnnualTarget / 12);
      monthlyTargets.push(monthlyTarget);
      totalTarget += monthlyTarget;
  
      // Move to the next month
      current.setMonth(current.getMonth() + 1);
    }

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
    };
}

const startDate = '2024-01-01';
const endDate = '2024-03-31';
const totalAnnualTarget = 5220;
