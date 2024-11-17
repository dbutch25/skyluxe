// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        projectId: "7ciiilpv", // Replace with your project ID
        dataset: 'production', // Replace with your dataset name if different
    },
    studioHost: 'skyluxe',
});