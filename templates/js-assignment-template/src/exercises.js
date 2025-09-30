export function sumAssignments(assignments) {
  if (!Array.isArray(assignments)) {
    throw new TypeError('assignments must be an array');
  }
  return assignments.reduce((total, item) => total + (item?.score ?? 0), 0);
}

export function normaliseStudentName(name) {
  if (typeof name !== 'string') {
    throw new TypeError('name must be a string');
  }
  return name
    .trim()
    .split(/\s+/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function calculateCompletionRate(assignments) {
  if (!Array.isArray(assignments) || assignments.length === 0) {
    return 0;
  }

  const completed = assignments.filter(item => typeof item?.score === 'number' && typeof item?.total === 'number');
  if (completed.length === 0) {
    return 0;
  }

  const totalAchieved = completed.reduce((sum, item) => sum + item.score, 0);
  const totalPossible = completed.reduce((sum, item) => sum + item.total, 0);

  return totalPossible === 0 ? 0 : totalAchieved / totalPossible;
}
