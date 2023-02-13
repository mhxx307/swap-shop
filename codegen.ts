import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:4000/graphql',
    // documents: 'src/graphql/*.graphql',
    documents: 'src/graphql/**/*.graphql',
    generates: {
        'src/types/generated/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
        },
    },
};

export default config;
