import path from 'path';

export interface Question {
    name: string;
    default?: string;
    isInvalid?(value: string, DATA: any): boolean;
    getQuestions?(value: string, DATA: any): Question[];
    setValue?(config: any, value: string, DATA: any): void;
    propertyName?: string;
    map?(data: string, DATA: any): any;
}
export const QUESTIONS: Question[] = [
    {
        name: 'Project Name',
        default: path.basename(path.resolve('.')),
        propertyName: 'name',
    },
    {
        name: 'Author',
        default: process.env.username,
        propertyName: 'author',
    },
    {
        name: 'Version',
        default: '0.1.0',
        propertyName: 'version',
        isInvalid(data) {
            const nums = data.split('-')[0].split('.');
            if (nums.length < 3) {
                if (Number.isFinite(Number(nums[0]))) {
                    this.default = nums[0] + '.0.0';
                    if (Number.isFinite(Number(nums[1]))) {
                        this.default = [nums[0], nums[1], '0'].join('.');
                    }
                }
                return true;
            }
            for (const n of nums) {
                if (!isFinite(Number(n))) return true;
            }
            return false;
        },
    },
    {
        name: 'Init Addon (Yes/No)',
        default: 'yes',
        isInvalid(data) {
            const low = data.toLowerCase();
            if (low === 'yes' || low === 'y') return false;
            if (low === 'n' || low === 'no') return false;
            return true;
        },
        getQuestions(data) {
            const low = data.toLowerCase();
            if (low.startsWith('y')) {
                return [
                    {
                        name: 'Behavior Pack',
                        default: './BP',
                        propertyName: 'packs.behaviorPack',
                    },
                    {
                        name: 'Resource Pack',
                        default: './RP',
                        propertyName: 'packs.resourcePack',
                    },
                    {
                        name: 'Use Scripts',
                        default: 'yes',
                        isInvalid(data) {
                            const low = data.toLowerCase();
                            if (low === 'yes' || low === 'y') return false;
                            if (low === 'n' || low === 'no') return false;
                            return true;
                        },
                        propertyName: 'init.options.use_script',
                    },
                ];
            }
            return [];
        },
    },
];
