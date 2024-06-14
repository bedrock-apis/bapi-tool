import { CONFIG_FILE_NAME } from '../consts';
import { VirtualDirectory } from '../io';
import { ProjectConfig } from './project-config';

export class ProjectContext {
    protected _cli?: () => void;
    protected _config: ProjectConfig;
    public readonly workingDirectory: VirtualDirectory;
    public get config() {
        return this._config;
    }
    /**
     * @param base working directory
     */
    private constructor(base: VirtualDirectory) {
        this.workingDirectory = base;
        this._config = null as any;
    }
    /**
     *
     * @param base Project's working directory
     * @returns Promise with new ProjectContext instance
     */
    public static CreateProject(base: VirtualDirectory, config: ProjectConfig) {
        const context = new ProjectContext(base);
        context._config = config;
        return context;
    }
    /**
     * Opens existing project from existing 'config.json' file
     * @param base Project's working directory
     * @returns Promise with new ProjectContext instance
     */
    public static async OpenProject(
        base: VirtualDirectory,
        configFileName?: string
    ) {
        const context = new ProjectContext(base);
        const file = await base.getFile(configFileName ?? CONFIG_FILE_NAME);
        if (file == null)
            throw new ReferenceError(
                "File not found  file_name: '" +
                    (configFileName ?? CONFIG_FILE_NAME) +
                    "'"
            );
        context._config = new ProjectConfig(file);
        await context._config.load();
        context._config.validate();
        return context;
    }
}
