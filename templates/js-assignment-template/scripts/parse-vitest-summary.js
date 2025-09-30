#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const COVERAGE_ENV_KEY = 'VITEST_OUTPUT';
const JUNIT_ENV_KEY = 'VITEST_JUNIT_RESULTS';

const defaultCoveragePath = './coverage/coverage-summary.json';
const defaultJUnitPath = './test-results.xml';

const coveragePath = resolve(process.cwd(), process.env[COVERAGE_ENV_KEY] ?? defaultCoveragePath);
const junitPath = resolve(process.cwd(), process.env[JUNIT_ENV_KEY] ?? defaultJUnitPath);

function safeReadJson(path) {
  if (!existsSync(path)) {
    return null;
  }

  try {
    const raw = readFileSync(path, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return { _error: `Failed to parse JSON from ${path}: ${error.message}` };
  }
}

function parseCoverageTotals(coverage) {
  if (!coverage || typeof coverage !== 'object') return null;

  const total = coverage.total ?? coverage;
  const pick = (metric) => {
    const value = total?.[metric];
    if (!value) return null;
    return {
      pct: typeof value.pct === 'number' ? value.pct : null,
      covered: typeof value.covered === 'number' ? value.covered : null,
      total: typeof value.total === 'number' ? value.total : null
    };
  };

  return {
    lines: pick('lines'),
    statements: pick('statements'),
    functions: pick('functions'),
    branches: pick('branches')
  };
}

function parseJUnitSummary(path) {
  if (!existsSync(path)) {
    return null;
  }

  const xml = readFileSync(path, 'utf8');
  const suiteMatch = xml.match(/<testsuite[^>]*>/); // Vitest outputs a single testsuite element
  const target = suiteMatch ? suiteMatch[0] : xml.match(/<testsuites[^>]*>/)?.[0];
  if (!target) {
    return null;
  }

  const attributes = {};
  const attrRegex = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(target))) {
    attributes[match[1]] = match[2];
  }

  const toNumber = (key) => {
    const value = attributes[key];
    return value !== undefined ? Number(value) : null;
  };

  const total = toNumber('tests') ?? 0;
  const failures = toNumber('failures') ?? 0;
  const errors = toNumber('errors') ?? 0;
  const skipped = toNumber('skipped') ?? 0;
  const timeSeconds = toNumber('time');

  const unsuccessful = failures + errors;
  const passed = Math.max(total - unsuccessful - skipped, 0);

  return {
    total,
    passed,
    failed: failures,
    errors,
    skipped,
    durationSeconds: typeof timeSeconds === 'number' && !Number.isNaN(timeSeconds) ? timeSeconds : null
  };
}

const coverageRaw = safeReadJson(coveragePath);
const coverage = parseCoverageTotals(coverageRaw);
const tests = parseJUnitSummary(junitPath);

const summary = {
  generatedAt: new Date().toISOString(),
  coverage,
  tests,
  warnings: []
};

if (!coverageRaw) {
  summary.warnings.push(`Coverage summary not found at ${coveragePath}`);
} else if (coverageRaw?._error) {
  summary.warnings.push(coverageRaw._error);
}

if (!tests) {
  summary.warnings.push(`Test results not found or could not be parsed at ${junitPath}`);
}

if (summary.warnings.length === 0) {
  delete summary.warnings;
}

process.stdout.write(JSON.stringify(summary));
