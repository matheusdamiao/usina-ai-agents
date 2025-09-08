
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { clinicAgent } from './agents/clinic-agent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, clinicAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
   telemetry: {
    serviceName: "braintrust",
    enabled: true,
    export: {
      type: "otlp",
    },
  },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
