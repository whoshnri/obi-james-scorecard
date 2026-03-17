
import { generateScorecardEmailHtml } from '../src/lib/actions/email';
import fs from 'fs';
import path from 'path';

const mockData = {
  firstName: 'Henry',
  email: 'test@example.com',
  role: 'Senior Developer',
  organization: 'ObiJames',
  totalScore: 85,
  level: 'Empowering Leader' as const,
  dimensionScores: {
    'Feedback Culture': 90,
    'Shared Accountability': 80,
    'Adaptive Leadership': 85,
    'Human Connection': 95,
    'Empowerment': 75,
  }
};

const html = generateScorecardEmailHtml(mockData);
const outputPath = path.join(process.cwd(), 'tmp', 'test-email.html');

if (!fs.existsSync(path.join(process.cwd(), 'tmp'))) {
  fs.mkdirSync(path.join(process.cwd(), 'tmp'));
}

fs.writeFileSync(outputPath, html);
console.log(`Test HTML generated at: ${outputPath}`);
console.log('You can open this file in your browser to verify the design.');
