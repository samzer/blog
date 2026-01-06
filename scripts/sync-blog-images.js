#!/usr/bin/env node

/**
 * This script syncs images from content/blog/[slug]/ to public/blog/[slug]/
 * It runs automatically before the build process.
 */

const fs = require('fs')
const path = require('path')

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')
const PUBLIC_DIR = path.join(process.cwd(), 'public/blog')

// Image extensions to copy
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico']

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase()
  return IMAGE_EXTENSIONS.includes(ext)
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function copyImages(srcDir, destDir) {
  const files = fs.readdirSync(srcDir)
  let copiedCount = 0

  for (const file of files) {
    if (isImageFile(file)) {
      const srcPath = path.join(srcDir, file)
      const destPath = path.join(destDir, file)

      // Only copy if source is newer or dest doesn't exist
      const shouldCopy = !fs.existsSync(destPath) ||
        fs.statSync(srcPath).mtime > fs.statSync(destPath).mtime

      if (shouldCopy) {
        fs.copyFileSync(srcPath, destPath)
        copiedCount++
        console.log(`  Copied: ${file}`)
      }
    }
  }

  return copiedCount
}

function syncBlogImages() {
  console.log('🖼️  Syncing blog images...\n')

  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('No content/blog directory found.')
    return
  }

  ensureDir(PUBLIC_DIR)

  const folders = fs.readdirSync(CONTENT_DIR)
  let totalCopied = 0

  for (const folder of folders) {
    const contentPath = path.join(CONTENT_DIR, folder)

    // Skip if not a directory
    if (!fs.statSync(contentPath).isDirectory()) continue

    // Check if it has an index.md (valid blog post)
    const indexPath = path.join(contentPath, 'index.md')
    if (!fs.existsSync(indexPath)) continue

    const publicPath = path.join(PUBLIC_DIR, folder)
    ensureDir(publicPath)

    console.log(`📁 ${folder}`)
    const copied = copyImages(contentPath, publicPath)
    totalCopied += copied

    if (copied === 0) {
      console.log('  (no new images)')
    }
  }

  console.log(`\n✅ Done! Copied ${totalCopied} image(s).`)
}

syncBlogImages()

