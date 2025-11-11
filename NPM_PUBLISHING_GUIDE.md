# 📦 How to Publish Your Package to NPM

This guide will walk you through publishing your Node.js package to the npm registry.

## Prerequisites

Before publishing, ensure you have:
- ✅ A valid npm account (create one at https://www.npmjs.com/signup)
- ✅ Node.js and npm installed on your machine
- ✅ Your package is ready and tested

## Step-by-Step Publishing Guide

### 1. Create an NPM Account (if you don't have one)

Visit https://www.npmjs.com/signup and create an account.

### 2. Login to NPM via CLI

Open your terminal and run:

```bash
npm login
```

You'll be prompted to enter:
- Username
- Password
- Email (this will be public)
- One-time password (if you have 2FA enabled)

Verify you're logged in:
```bash
npm whoami
```

### 3. Prepare Your Package

#### A. Update package.json

Make sure these fields are properly filled:

```json
{
  "name": "your-unique-package-name",
  "version": "1.0.0",
  "description": "Clear description of your package",
  "main": "app.js",
  "author": "Your Name <your.email@example.com>",
  "license": "ISC",
  "keywords": ["nodejs", "express", "api", "boilerplate"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-repo.git"
  }
}
```

**Important Notes:**
- The `name` must be unique on npm (check availability at https://www.npmjs.com/package/your-package-name)
- Use lowercase letters, hyphens, and numbers only
- If the name is taken, try adding a scope: `@yourusername/package-name`

#### B. Check Your Package Name Availability

```bash
npm search your-package-name
```

Or visit: `https://www.npmjs.com/package/your-package-name`

If it exists, choose a different name!

#### C. Create/Update .npmignore

Create a `.npmignore` file to exclude unnecessary files from your package:

```
# Dependencies
node_modules/

# Environment files
.env
.env.*
!.env.example

# Development files
.vscode/
.idea/

# Logs
logs/
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# OS files
.DS_Store
Thumbs.db

# Git
.git/
.gitignore

# Docker
Dockerfile
docker-compose.yml
.dockerignore

# Uploads (user-generated content)
uploads/*
!uploads/.gitkeep

# Documentation
NPM_PUBLISHING_GUIDE.md
```

### 4. Test Your Package Locally

Before publishing, test your package:

```bash
# Check for errors
npm run start

# Verify package contents
npm pack --dry-run
```

The `npm pack --dry-run` command shows what files will be included in your package.

### 5. Version Your Package

Follow semantic versioning (MAJOR.MINOR.PATCH):

```bash
# For bug fixes (1.0.0 -> 1.0.1)
npm version patch

# For new features (1.0.0 -> 1.1.0)
npm version minor

# For breaking changes (1.0.0 -> 2.0.0)
npm version major
```

Or manually update the version in `package.json`.

### 6. Publish to NPM

#### For Public Packages (Free)

```bash
npm publish
```

#### For Scoped Packages

If your package name is `@yourusername/package-name`:

```bash
# Public scoped package
npm publish --access public

# Private scoped package (requires paid npm account)
npm publish --access restricted
```

### 7. Verify Publication

After publishing, verify your package:

1. Visit: `https://www.npmjs.com/package/your-package-name`
2. Test installation:
```bash
npm install your-package-name
```

## 🔄 Updating Your Package

When you make changes and want to publish an update:

1. Make your changes
2. Update version:
```bash
npm version patch  # or minor/major
```
3. Publish:
```bash
npm publish
```

## 📋 Pre-Publish Checklist

Before publishing, ensure:

- [ ] Package name is unique and available
- [ ] `package.json` has all required fields filled
- [ ] README.md is comprehensive and helpful
- [ ] `.npmignore` excludes unnecessary files
- [ ] `.env.example` is included (but not `.env`)
- [ ] Code is tested and working
- [ ] Version number is correct
- [ ] License is specified
- [ ] Repository URL is correct
- [ ] Keywords are relevant for discoverability

## 🚨 Common Issues and Solutions

### Issue: Package name already exists
**Solution:** Choose a different name or use a scoped package (`@username/package-name`)

### Issue: 403 Forbidden error
**Solution:** 
- Make sure you're logged in: `npm whoami`
- Check if you have permission to publish
- For scoped packages, use `--access public`

### Issue: 402 Payment Required
**Solution:** You're trying to publish a private package without a paid account. Use `--access public` instead.

### Issue: Files missing after installation
**Solution:** Check your `.npmignore` file - you might be excluding necessary files.

## 🔐 Security Best Practices

1. **Never publish sensitive data:**
   - Don't include `.env` files
   - Remove API keys and secrets
   - Check `.npmignore` is properly configured

2. **Enable 2FA (Two-Factor Authentication):**
```bash
npm profile enable-2fa auth-and-writes
```

3. **Use npm audit:**
```bash
npm audit
npm audit fix
```

## 📊 After Publishing

### Monitor Your Package

- Check download stats: https://npm-stat.com/charts.html?package=your-package-name
- Monitor issues on GitHub
- Respond to user feedback

### Promote Your Package

- Share on social media
- Write a blog post
- Add to awesome lists
- Submit to relevant communities

## 🔗 Useful Commands

```bash
# Check package info
npm view your-package-name

# Check your published packages
npm profile get

# Unpublish a package (within 72 hours)
npm unpublish your-package-name@version

# Deprecate a version
npm deprecate your-package-name@version "Reason for deprecation"

# Update package metadata
npm owner add username your-package-name
npm owner rm username your-package-name
```

## 📚 Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Creating Node.js Modules](https://docs.npmjs.com/creating-node-js-modules)

---

**Good luck with your npm package! 🚀**
