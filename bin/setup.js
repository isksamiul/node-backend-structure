#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..');
const targetDir = process.cwd();

// Files/Dirs to ignore when copying
const ignoreList = [
    'node_modules',
    'bin',
    '.git',
    '.npmignore',
    'package-lock.json',
    'dist',
    'build'
];

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (ignoreList.includes(entry.name)) {
            continue;
        }

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            // If copying package.json, we might want to modify it
            if (entry.name === 'package.json') {
                handlePackageJson(srcPath, destPath);
            } else if (entry.name === '_gitignore') {
                // Rename _gitignore to .gitignore
                fs.copyFileSync(srcPath, path.join(dest, '.gitignore'));
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

function handlePackageJson(src, dest) {
    const pkg = JSON.parse(fs.readFileSync(src, 'utf8'));

    // Remove bin entry so the generated project doesn't act as a CLI
    delete pkg.bin;

    // Reset name/version/description for the new project
    pkg.name = 'my-backend-app';
    pkg.version = '1.0.0';
    pkg.description = 'Backend application generated from node-backend-structure';

    // Write to destination
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2));
}

console.log('🚀 Initializing project from node-backend-structure...');

try {
    copyDir(sourceDir, targetDir);

    // Create uploads directory explicitly
    const uploadsDir = path.join(targetDir, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }

    console.log('\n✅ Project structure created successfully!');
    console.log('\nNext steps:');
    console.log('1. npm install');
    console.log('2. cp .env.example .env');
    console.log('3. npm run dev');
} catch (error) {
    console.error('❌ Error initializing project:', error);
    process.exit(1);
}
