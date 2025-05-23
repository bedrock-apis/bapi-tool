/**
 * compoud - And restricted object type with specific properties
 *      - properties - Array of properties - default empty array
 *          - name - Name of the property
 *          - optional - Is optional
 *      - whitelisted - Allows only specified properties - default true
 *
 * map - Any number of properties but they have to share same value type
 *  - valueType - A Type
 *
 * array -
 *   - maxSize - number default Number.MAX_INT
 *   - minSize - number default 0
 *   - valueType - A Type
 *
 * string - string value type only
 *   - validValues - string[] Only specified values are valid values
 *   - caseCare - boolean
 *
 * number - number value type only
 *   - max - number
 *   - min - number
 *
 * see ../json-validator/README.md
 */

export default {
    type: 'compoud',
    properties: [
        {
            type: 'string',
            name: 'author',
            optional: true,
        },
        {
            type: 'string',
            name: 'name',
            optional: true,
        },
        {
            type: 'compoud',
            name: 'packs',
            optional: true,
            properties: [
                {
                    type: 'string',
                    optional: true,
                    name: 'behaviorPack',
                },
                {
                    type: 'string',
                    optional: true,
                    name: 'resourcePack',
                },
            ],
        },
        {
            type: 'compoud',
            name: 'bapi',
            optional: true,
            properties: [
                {
                    type: 'map',
                    optional: true,
                    name: 'exports',
                    valueType: {
                        type: 'compoud',
                        properties: [
                            {
                                type: 'string',
                                name: 'exportType',
                                validValues: [
                                    'addon',
                                    'packs',
                                    'library',
                                    'plugin',
                                ],
                            },
                            {
                                type: 'string',
                                name: 'source',
                            },
                            {
                                type: 'string',
                                name: 'outDir',
                            },
                        ],
                    },
                },
                {
                    type: 'map',
                    optional: true,
                    name: 'watcher',
                    valueType: {
                        type: 'compoud',
                        properties: [
                            {
                                type: 'string',
                                name: 'exportType',
                                validValues: [
                                    'addon',
                                    'packs',
                                    'library',
                                    'plugin',
                                ],
                            },
                            {
                                type: 'string',
                                name: 'source',
                            },
                            {
                                type: 'string',
                                name: 'outDir',
                            },
                        ],
                    },
                },
                {
                    type: 'string',
                    optional: true,
                    name: 'workspace',
                },
            ],
        },
    ],
};
