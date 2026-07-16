#!/usr/bin/env node
/**
 * One-time script: imports a training-plan export (JSON) into Cloud Firestore.
 *
 * Setup:
 *   npm install firebase-admin
 *
 * Usage:
 *   node import-to-firestore.js training-plan-export.json /path/to/serviceAccountKey.json
 *
 * Where:
 *   - training-plan-export.json is produced by the browser console snippet in
 *     export-sheet-snippet.js (run on the *current*, Sheets-backed im/index.html
 *     while signed in).
 *   - serviceAccountKey.json is a private key you generate yourself from
 *     Firebase console → Project settings → Service accounts → Generate new
 *     private key. Keep this file OUTSIDE the git repo and never commit it —
 *     it grants full admin access to the project, bypassing all security rules.
 *
 * This writes one Firestore document per tab into the "trainingPlan"
 * collection, using the tab name as the document ID:
 *   trainingPlan/{tabName} = { values, bold, merges, updatedAt }
 */

const fs = require('fs');
const admin = require('firebase-admin');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const [, , dataPath, keyPath] = process.argv;

if (!dataPath || !keyPath) {
  console.error('Usage: node import-to-firestore.js <export.json> <serviceAccountKey.json>');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

admin.initializeApp({ credential: admin.cert(serviceAccount) });
const db = getFirestore();

async function main() {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const tabNames = Object.keys(data);

  if (tabNames.length === 0) {
    console.error('No tabs found in export file.');
    process.exit(1);
  }

  const batch = db.batch();
  for (const tabName of tabNames) {
    const grid = data[tabName];
    const ref = db.collection('trainingPlan').doc(tabName);
    batch.set(ref, {
      // Firestore rejects arrays nested inside arrays, so the 2D grids are
      // JSON-encoded here and decoded again in im/index.html's loadGrid().
      values: JSON.stringify(grid.values || []),
      bold: JSON.stringify(grid.bold || []),
      merges: grid.merges || [],
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
  console.log(`Imported ${tabNames.length} tab(s) into Firestore collection "trainingPlan": ${tabNames.join(', ')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
