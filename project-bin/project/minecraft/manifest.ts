import { randomUUID } from 'crypto';
import { MIN_ENGINE_VERSION_ARRAY } from '../../consts';

export interface ManifestHeader {
    name?: string;
    description?: string;
    uuid?: string;
    version?: string | [number, number, number];
    min_engine_version?: [number, number, number];
}
export interface ManifestModule {
    type?: string;
    uuid?: string;
    entry?: string;
    version?: string | [number, number, number];
}
export interface ManifestDependency {
    module_name?: string;
    uuid?: string;
    version: string | [number, number, number];
}
export interface Manifest {
    format_version: number;
    header: ManifestHeader;
    modules: ManifestModule[];
    dependencies: ManifestDependency[];
    capabilities?: string[];
}
export class Manifest {
    public static HasScripting(manifest: Manifest): boolean {
        return manifest.modules[0]?.type === 'script';
    }
    public static AsDependency(manifest: Manifest): ManifestDependency {
        return {
            uuid: manifest.header.uuid,
            version: manifest.header.version!,
        };
    }
    public static CreateManifest(
        moduleType: string,
        version: string = '0.1.0-alpha'
    ): Manifest {
        return {
            format_version: 2,
            header: {
                name: `pack.name`,
                description: `pack.description`,
                uuid: randomUUID(),
                min_engine_version: MIN_ENGINE_VERSION_ARRAY as [
                    number,
                    number,
                    number,
                ],
                version,
            },
            modules: [
                {
                    type: moduleType,
                    uuid: randomUUID(),
                    version,
                },
            ],
            dependencies: [],
        };
    }
}
