function calculateTotalTarget(startDate, endDate, totalAnnualTarget, daysToExclude = [5]) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];
    let totalTarget = 0;
}