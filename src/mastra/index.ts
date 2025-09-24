
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { clinicAgent } from './agents/clinic-agent';
import { chatRoute } from '@mastra/ai-sdk'
import { realEstateAgent } from './agents/real-estate-agent';
import { Agent } from '@mastra/core';
import { registerApiRoute } from '@mastra/core/server';
import { realEstateDevelopmentAgent } from './agents/real-estate-development-agent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, clinicAgent, realEstateAgent, realEstateDevelopmentAgent },
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
  // server: {
  //   port: parseInt("4111"),
  //   host: "172.30.36.211",
  //   apiRoutes: [
  //     chatRoute({
  //       path: '/chat',
  //       agent: "clinicAgent",
  //     }),
  //   ],
  // },
  server: {

  //   apiRoutes: [
  //     registerApiRoute("/chat/:agentId", {
  //       method: "POST",
  //       handler: async (c) => {
  //         const { agentId } = c.req.param();
  //         const mastra = c.get("mastra");

  //         const agent = mastra.getAgentById(agentId); // or mastra.getAgent(agentId)
  //         if (!agent)
  //           return c.json({ error: `Unknown agent: ${agentId}` }, 404);

  //         // Safely parse body and log
  //         const cloned = c.req.raw.clone(); // allows fallback logging if JSON fails
  //         let body: any = {};
  //         try {
  //           body = await c.req.json();
  //         } catch (e) {
  //           const raw = await cloned.text();
  //           console.warn("Failed to parse JSON body. Raw body:", raw);
  //           body = {};
  //         }

  //         console.log("parsed body:", body);

  //         type StreamMessagesInput = Parameters<Agent["streamVNext"]>[0];
  //         type SendMessagesRequest = {
  //           messages: StreamMessagesInput;
  //           threadId?: string;
  //           resourceId?: string;
  //           trigger?: string;
  //           messageId?: string;
  //         };
  //          const {
  //           threadId,
  //           resourceId,
  //           trigger, // available if you want to log/use it
  //           messageId, // available if you want to log/use it
  //         } = body as Partial<SendMessagesRequest>;

  //         console.log("threadId:", threadId);
  //         console.log("resourceId:", resourceId);

  //         if (!threadId || !resourceId) {
  //           return c.json({ error: "Missing threadId or resourceId" }, 400);
  //         }

  //         // Ensure messages is typed as the union accepted by streamVNext
  //         const messages = (body?.messages ?? []) as StreamMessagesInput;

  //         const stream = await agent.streamVNext(messages, {
  //           memory: {
  //             thread: threadId, // Pass your thread ID here
  //             resource: resourceId, // Pass your resource ID here
  //           },
  //           format: "aisdk", // Specify the format as aisdk
  //         });

  //         return stream.toUIMessageStreamResponse();
  //       },
  //     }),
  //   ],
  }
});

