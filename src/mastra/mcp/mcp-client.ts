import { MCPClient } from "@mastra/mcp";
 
export const mcp = new MCPClient({
  timeout: 200000,
  servers: {
    // googleCalendar: {
    //   url: new URL("https://apollo-rf6v9rs8q-composio.vercel.app/v3/mcp/89cb5940-48e1-4173-acce-ddda488eebf5/mcp?include_composio_helper_actions=true"),
    // },

    googleCalendarMcp: {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@goldk3y/google-calendar-mcp",
        "--key",
        "643e073f-1dd6-47a9-85f6-79422556ef01",
        "--profile",
        "vicious-rhinoceros-JwWsAj"
      ]
    }
    // gsuitemcp: {
    //   "command": "npx",
    //   "args": [
    //     "-y",
    //     "@smithery/cli@latest",
    //     "run",
    //     "@rishipradeep-think41/gsuite-mcp",
    //     "--key",
    //     "643e073f-1dd6-47a9-85f6-79422556ef01",
    //     "--profile",
    //     "vicious-rhinoceros-JwWsAj"
    //   ]
    // }
  },
});