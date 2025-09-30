import { sumAssignments, normaliseStudentName, calculateCompletionRate } from './exercises.js';

const sampleStudent = {
  name: '  faith  grace  ',
  assignments: [
    { id: 'js-basics-01', score: 85, total: 100 },
    { id: 'js-basics-02', score: 40, total: 50 },
    { id: 'js-basics-03', score: 25, total: 50 }
  ]
};

const totalScore = sumAssignments(sampleStudent.assignments);
const completionRate = calculateCompletionRate(sampleStudent.assignments);
const cleanName = normaliseStudentName(sampleStudent.name);

console.log('--- Sample Progress Report ---');
console.log(`Student: ${cleanName}`);
console.log(`Total Score: ${totalScore}`);
console.log(`Completion Rate: ${(completionRate * 100).toFixed(1)}%`);
