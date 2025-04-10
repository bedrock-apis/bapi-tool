export async function DownloadContent(url: string, headers = {}) {
    return Buffer.from(
        await (await fetch(url, { headers, method: 'GET' })).arrayBuffer()
    );
}

export async function SafeDownloadContent(
    url: string,
    headers?: { [K: string]: string }
): Promise<{ data?: Buffer; error?: any }> {
    try {
        return {
            data: Buffer.from(
                await (
                    await fetch(url, { headers, method: 'GET' })
                ).arrayBuffer()
            ),
        };
    } catch (error) {
        return { error: error };
    }
}
export async function GetGithubContent(url: string): Promise<Buffer | null> {
    try {
        const data = await DownloadContent(url);
        if (
            data.byteLength === Buffer.from(GITHUB_NOT_FOUND_MESSAGE).byteLength
        ) {
            return data.toString() === GITHUB_NOT_FOUND_MESSAGE ? null : data;
        }
        return data;
    } catch (error) {
        return null;
    }
}
