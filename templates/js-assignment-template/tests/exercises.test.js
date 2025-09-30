import { describe, expect, it } from 'vitest';
import { sumAssignments, normaliseStudentName, calculateCompletionRate } from '../src/exercises.js';

describe('sumAssignments', () => {
  it('sums scores from assignments array', () => {
    const assignments = [
      { score: 10 },
      { score: 15 },
      { score: 5 }
    ];

    expect(sumAssignments(assignments)).toBe(30);
  });

  it('treats missing scores as zero', () => {
    const assignments = [{}, { score: 5 }];
    expect(sumAssignments(assignments)).toBe(5);
  });
});

describe('normaliseStudentName', () => {
  it('cleans whitespace and capitalises each part', () => {
    expect(normaliseStudentName('  jane   DOE ')).toBe('Jane Doe');
  });
});

describe('calculateCompletionRate', () => {
  it('computes total score divided by total possible', () => {
    const assignments = [
      { score: 40, total: 50 },
      { score: 45, total: 50 }
    ];
    expect(calculateCompletionRate(assignments)).toBeCloseTo(0.85, 2);
  });

  it('returns 0 when there are no valid assignments', () => {
    expect(calculateCompletionRate([])).toBe(0);
  });
});
