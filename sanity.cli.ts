// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        projectId: 'your_project_id', // Replace with your project ID
        dataset: 'production', // Replace with your dataset name if different
    },
    studioHost: 'skyluxe',
});