import { formatDateTime } from '@helpers/dateFormating';

const fs = require('fs');
const path = require('path');

const getLogFileName = () => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  return `log-${dateStr}.log`;
};

export const logMessage = (message) => {
  const logDir = path.join(process.cwd(), 'logs');
  const logFileName = getLogFileName();
  const logFilePath = path.join(logDir, logFileName);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logEntry = `[${formatDateTime(new Date())}] ${message}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write log to file:', err);
    }
  });
};
