import assert from 'assert';
import { checkAnswer } from './answer';
import { questions } from './questions';

// Country bbox test - France
const france = questions.find(q => q.id === 16)!;
let result = checkAnswer(france, 48.8, 2.3); // Paris
assert(result.correct, 'France bbox should accept Paris');

result = checkAnswer(france, 0, 0); // far away
assert(!result.correct, 'France bbox should reject 0,0');

// Capital radius test - Moscow
const moscow = questions.find(q => q.id === 11)!;
result = checkAnswer(moscow, 55.75, 37.6); // near center
assert(result.correct, 'Moscow radius should accept nearby point');

result = checkAnswer(moscow, 57, 37.6); // far north ~140 km
assert(!result.correct, 'Moscow radius should reject far point');

console.log('checkAnswer tests passed');
