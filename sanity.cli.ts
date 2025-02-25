// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your project ID
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET // Replace with your dataset name if different
    },
    studioHost: 'skyluxe',
});