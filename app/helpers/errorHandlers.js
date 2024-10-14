import { logMessage } from '@helpers/createLogs';

export const handleErrors = (fn) => async (req) => {
  try {
    const response = await fn(req);
    return response;
    
  } catch (error) {
    logMessage(`Error: ${error.message}\nStack: ${error.stack}`);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
