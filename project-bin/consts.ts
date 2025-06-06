import path from 'path';
import process from 'process';
export const CONFIG_FILE_NAME = 'config.json';
export const MANIFEST_FILE_NAME = 'manifest.json';
export const PACK_ICON_FILE_NAME = 'pack_icon.png';
export const MIN_ENGINE_VERSION_ARRAY = [1, 21, 0];
export const MIN_ENGINE_VERSION = MIN_ENGINE_VERSION_ARRAY.join('.');
export const BAPI_VERSION = '0.2.0';
export const PUBLISHER_ID = '8wekyb3d8bbwe';
export const CORPORATION_ID = 'Microsoft';
export const LATEST_NAME = 'MinecraftUWP';
export const Preview_NAME = 'MinecraftWindowsBeta';
export const LATEST_MINECRAFT_PACKAGE_FAMILY = `${CORPORATION_ID}.${LATEST_NAME}_${PUBLISHER_ID}`;
export const PREVIEW_MINECRAFT_PACKAGE_FAMILY = `${CORPORATION_ID}.${Preview_NAME}_${PUBLISHER_ID}`;
export const LATEST_COM_MOJANG = path.resolve(
    process.env.APPDATA ?? '.',
    `../Local/Packages/${LATEST_MINECRAFT_PACKAGE_FAMILY}/LocalState/games/com.mojang`
);
export const PREVIEW_COM_MOJANG = path.resolve(
    process.env.APPDATA ?? '.',
    `../Local/Packages/${PREVIEW_MINECRAFT_PACKAGE_FAMILY}/LocalState/games/com.mojang`
);
export const PACK_ICON_PNG =
    'iVBORw0KGgoAAAANSUhEUgAAALAAAACwCAYAAACvt+ReAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAR7SURBVHhe7d1Pb04JFMfxXtTfGqZPVM1DnlQQ0qaRDJ1EatGNDQaxYTNhYyHeh1fRdGHBlpnZSbpgFoqNaHRhNBKl0TRMGCUjU4vnLLyAcxbf5PtJGr+l3Hw1d3Pc5vrp0dWeAoOtvli5Fpc/xsq18O5TrFwL71diMYwNtWLlqnq+a+JPCcmAhWbAQjNgoRmw0AxYaAYsNAMWmgELzYCFZsBCM2ChGbDQDFhoBiw0AxaaAQvNgIVmwEIzYKEZsNCaqUvHSq6SJ6fnYuU6vKc/Vq6f9w3EylV1RT0zvxwr19ipy7GSzd6JkavsN/Dm9etKfqTvlQW8ZUNvyY/0Pd+BhWbAQjNgoRmw0AxYaAYsNAMWmgELzYCFZsBCM2ChGbDQDFhoBiw0AxaaAQvNgIVmwEIzYKE1453+kqvkkxevxso188dUrFyrq//HynXm6FCsXFXXzg9eLMXKVfUcmhP7B0oCnjh/JVauqoC3bqy5eJ4YacfKVRXwszf/xMpV9RyacyPtkoCr/n+BqoDb2zfFykX7/yaqvipf9Rx8BxaaAQvNgIVmwEIzYKEZsNAMWGgGLDQDFpoBC82AhWbAQjNgoRmw0AxYaAYsNAMWmgELzYCF1lw/PVpyE1d13frL3h2xcg22+mLlot2utX/cHCvXn09excpVFnDVdeuhXdti5TLgrqqAp+cWY+UqC5j2gA24q+r5Vn1d33dgoRmw0AxYaAYsNAMWmgELzYCFZsBCM2ChGbDQDFhoBiw0AxaaAQvNgIVmwEIzYKEZsNAMWGjN2eFdJTdxTVPzb2Ppw0qsXCdHd8fKRfvy5eT0XKxcO7bWfAm1+e1IpyTgD5+/xsr175f/YuWaODgYKxct4Jt/PY+Va8uG3li5mmvj+2qukt/X/KasMjbUipWLFvCdRy9jMfgOLDQDFpoBC82AhWbAQjNgoRmw0AxYaAYsNAMWmgELzYCFZsBCM2ChGbDQDFhoBiw0AxaaAQutmbp0rOQm7vHzt7FyVd3alV07X7waK9eD3ydj5ar6FnXVbaABh7Jr5/NXYuV6dvdGrFxV36I24IC7dj51OVauhfu3YuWq+lZyVcC+AwvNgIVmwEIzYKEZsNAMWGgGLDQDFpoBC82AhWbAQjNgoRmw0AxYaAYsNAMWmgELzYCFZsBCK/tSZ9Vt1cz8cqxcvx7pxMp1b/Z1rFzHh3+Klev2w/lYuaqunQ04VAU8+7Lm7zvcqfk07vTThVi5qq6dDThUBby4/DFWrsFWX6xcVdfkVT34Diw0AxaaAQvNgIVmwEIzYKEZsNAMWGgGLDQDFpoBC82AhWbAQjNgoRmw0AxYaAYsNAMWmgELrRnv9JfcxB3e0x8rV3v8QqxcVV++rPLpy9dYud6t1Hxyt+rmsDmxf6Ak4AM7f4iVy4C7NvaujZXr76WaI9SygM+NtGuukrdvipXLgLu8+u7yHVhoBiw0AxaaAQvNgIVmwEIzYKEZsNAMWGgGLDQDFpoBC82AhWbAQjNgoRmw0AxYaAYsNAMWWE/PN+P8+8fhE3qsAAAAAElFTkSuQmCC';
