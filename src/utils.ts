import { InvalidArgumentError } from 'commander';

export function validateEnum(enumV: Record<string, unknown>) {
    return (format: string) => {
        if (!Object.keys(enumV).includes(format)) {
            throw new InvalidArgumentError('invalid format: ' + format);
        } else return format;
    };
}

export function validateInt(range?: { min: number; max: number }) {
    return (v: string) => {
        const parsed = parseInt(v);
        if (isNaN(parsed)) {
            throw new InvalidArgumentError(
                'expected to be a valid int but got: ' + v,
            );
        }
        if (range) {
            if (parsed < range.min)
                throw new InvalidArgumentError(
                    'expected to be bigger then ' + range.min,
                );

            if (parsed > range.max)
                throw new InvalidArgumentError(
                    'expected to be less then ' + range.max,
                );
        }
        return parsed;
    };
}
