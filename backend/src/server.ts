const http = require('http');
const { questions } = require('./questions');
const { checkAnswer } = require('./answer');
const { AnswerRequest, AnswerResponse, Question } = require('./types');

const sessionStrikes: Record<string, number> = {};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function getRandomQuestion(category: string): any {
  const filtered = questions.filter((q: any) => q.category === category);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function sendJson(res: any, data: unknown, status = 200) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    ...corsHeaders,
  });
  res.end(body);
}

function handleGetQuestions(req: any, res: any) {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const category = url.searchParams.get('category') || 'landmark';
  const question = getRandomQuestion(category);
  sendJson(res, question);
}

function handleCheckAnswer(req: any, res: any) {
  let body = '';
  req.on('data', (chunk: any) => {
    body += chunk;
  });
  req.on('end', () => {
    const data: any = JSON.parse(body || '{}');
    const question = questions.find((q: any) => q.id === data.questionId);
    if (!question) {
      sendJson(res, { error: 'Question not found' }, 400);
      return;
    }

    const { correct, distance } = checkAnswer(
      question,
      data.clickedLat,
      data.clickedLng
    );
    const prevStrike = sessionStrikes[data.sessionId] || 0;
    const strike = correct ? prevStrike + 1 : 0;
    sessionStrikes[data.sessionId] = strike;

    const response = {
      correct,
      correctLat: question.lat,
      correctLng: question.lng,
      distanceKm: distance,
      strike,
    };
    sendJson(res, response);
  });
}

const server = http.createServer((req: any, res: any) => {
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }
  if (req.method === 'GET' && url.pathname === '/questions') {
    handleGetQuestions(req, res);
  } else if (req.method === 'POST' && url.pathname === '/check-answer') {
    handleCheckAnswer(req, res);
  } else {
    sendJson(res, { error: 'Not found' }, 404);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
