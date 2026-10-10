// node build-index.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONTENT_DIR = './content';

const CATEGORY_MAP = {
    'ae-effects': { key: '特效', category: 'effects', categoryName: 'AE特效', file: 'category-data.js' },
    'ae-expressions': { key: '表达', category: 'expressions', categoryName: 'AE表达式', file: 'category-data.js' },
    'ae-scripting': { key: '脚本', category: 'scripting', categoryName: 'AE脚本', file: 'category-data.js' },
    'ae-plugins': { key: '插件', category: 'plugins', categoryName: 'AE插件', file: 'category-data.js' },
    'software': { key: '软件', category: 'software', categoryName: '软件指南', file: 'category-data.js' },
    'downloads': { key: '下载', category: 'downloads', categoryName: '资源下载', file: 'downloads-data.js', isDownload: true },
};

const db = {};

for (const [folder, meta] of Object.entries(CATEGORY_MAP)) {
    const dataFile = join(CONTENT_DIR, folder, 'js', meta.file);
    let src;
    try {
        src = await readFile(dataFile, 'utf8');
    } catch {
        console.warn(`跳过 ${folder}：找不到 ${dataFile}`);
        continue;
    }

    const m = src.match(/(?:const|let|var)\s+(\w+)\s*=/);
    if (!m) {
        console.error(`跳过 ${folder}：找不到变量声明`);
        continue;
    }
    const varName = m[1];

    let arr;
    try {
        arr = new Function(src + `\nreturn ${varName};`)();
    } catch (e) {
        console.error(`执行 ${dataFile} 失败：${e.message}`);
        continue;
    }

    if (!Array.isArray(arr)) {
        console.error(`跳过 ${folder}：${varName} 不是数组`);
        continue;
    }

    db[meta.key] = arr.map(item => {
        // 下载区：字段名不一样，单独映射
        if (meta.isDownload) {
            return {
                id: item.id,
                title: item.title,
                category: 'downloads',
                categoryName: '资源下载',
                description: item.description || '',
                size: item.fileSize || '',
                downloads: item.downloadCount || 0,
                type: item.category || 'template',
                url: item.url || '',
                detailUrl: item.detailUrl || '',
                date: item.date || ''
            };
        }

        // 文章区：通用映射
        return {
            id: item.id,
            title: item.title,
            category: meta.category,
            categoryName: meta.categoryName,
            date: item.date || '',
            description: item.description || '',
            content: item.content || '',
            url: `./content/${folder}/${item.url}`
        };
    });
}

const out = 'window.mockDatabase = ' + JSON.stringify(db, null, 2) + ';';
await writeFile('./js/search-data.js', out, 'utf8');

console.log('✅ 生成 js/search-data.js');
for (const [k, v] of Object.entries(db)) {
    console.log(`  ${k}: ${v.length} 条`);
}