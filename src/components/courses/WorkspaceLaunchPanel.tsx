import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ClipboardCopy,
  ClipboardCheck,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Layers,
  Rocket
} from 'lucide-react';
import type { LessonWorkspace } from '../../store/slices/courseSlice';
import type { User } from '../../store/slices/authSlice';

interface WorkspaceLaunchPanelProps {
  workspace: LessonWorkspace;
  student?: User | null;
}

type CopyTarget = 'handle' | 'slug' | 'branch' | null;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 48);

const buildStudentHandle = (student?: User | null) => {
  if (!student) {
    return 'guest-student';
  }

  const primary = [student.firstName, student.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();

  if (primary) {
    const normalized = normalize(primary);
    if (normalized) {
      return normalized;
    }
  }

  if (student.email) {
    const [local] = student.email.split('@');
    const normalized = normalize(local);
    if (normalized) {
      return normalized;
    }
  }

  return 'student';
};

const buildBranchName = (assignmentSlug: string, handle: string) => {
  const combined = normalize(`${assignmentSlug}-${handle}`);
  return combined || `${assignmentSlug}-submission`;
};

const appendParams = (baseUrl: string | undefined, params: Record<string, string | undefined>) => {
  if (!baseUrl) {
    return undefined;
  }

  try {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (!value) return;
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });
    return url.toString();
  } catch (error) {
    // If URL constructor fails, fall back to returning the base URL
    return baseUrl;
  }
};

const WorkspaceLaunchPanel: React.FC<WorkspaceLaunchPanelProps> = ({ workspace, student }) => {
  const [copied, setCopied] = useState<CopyTarget>(null);

  const { studentHandle, branchName, stackblitzLaunchUrl, codesandboxLaunchUrl, primaryEnvironment } = useMemo(() => {
    const handle = buildStudentHandle(student);
    const branch = buildBranchName(workspace.assignmentSlug, handle);

    const stackblitzUrl = appendParams(workspace.stackblitzUrl, {
      assignment: workspace.assignmentSlug,
      student: handle,
      workspace: branch,
      file: 'README.md',
      terminal: 'dev',
    });

    const codesandboxUrl = appendParams(workspace.codesandboxUrl, {
      assignment: workspace.assignmentSlug,
      student: handle,
    });

    return {
      studentHandle: handle,
      branchName: branch,
      stackblitzLaunchUrl: stackblitzUrl,
      codesandboxLaunchUrl: codesandboxUrl,
      primaryEnvironment: workspace.preferredEnvironment ?? (stackblitzUrl ? 'stackblitz' : codesandboxUrl ? 'codesandbox' : undefined),
    };
  }, [student, workspace.assignmentSlug, workspace.codesandboxUrl, workspace.preferredEnvironment, workspace.stackblitzUrl]);

  const handleCopy = async (value: string, target: Exclude<CopyTarget, null>) => {
    if (!value) return;

    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        throw new Error('Clipboard API is not available');
      }

      await navigator.clipboard.writeText(value);
      setCopied(target);
      setTimeout(() => setCopied(null), 1800);
    } catch (error) {
      console.warn('Unable to copy to clipboard', error);
    }
  };

  const openInNewTab = (url?: string) => {
    if (!url) return;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const instructions = workspace.instructions ?? [
    'Launch the online editor and create a personal fork of the template.',
    'Follow the steps in TASKS.md inside the workspace to complete each exercise.',
    'Run the provided test command until all checks pass, then push your work to GitHub.',
  ];

  const environmentMeta = {
    stackblitz: { name: 'StackBlitz', Icon: Rocket },
    codesandbox: { name: 'CodeSandbox', Icon: Layers },
  } as const;

  type EnvironmentKey = keyof typeof environmentMeta;

  const availableEnvironments = [
    stackblitzLaunchUrl ? { key: 'stackblitz' as EnvironmentKey, url: stackblitzLaunchUrl } : null,
    codesandboxLaunchUrl ? { key: 'codesandbox' as EnvironmentKey, url: codesandboxLaunchUrl } : null,
  ].filter(Boolean) as Array<{ key: EnvironmentKey; url: string }>;

  const preferred = primaryEnvironment ?? availableEnvironments[0]?.key;

  const sortedEnvironments = availableEnvironments
    .slice()
    .sort((a, b) => (a.key === preferred ? -1 : b.key === preferred ? 1 : 0));

  const primaryButtonClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  const secondaryButtonClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white px-4 py-3 text-blue-700 transition hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-blue-800 dark:bg-transparent dark:text-blue-200 dark:hover:bg-blue-900/40';

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-900 dark:bg-blue-950/60">
        <div className="mb-4 flex items-start gap-3">
          <Code2 className="mt-1 h-6 w-6 text-blue-600 dark:text-blue-300" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Launch coding workspace</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Open a fresh copy of the <span className="font-semibold">{workspace.templateSlug}</span> template, complete the
              assignment tasks, and push your solution to GitHub.
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {sortedEnvironments.length > 0 ? (
            sortedEnvironments.map(({ key, url }) => {
              const { name, Icon } = environmentMeta[key];
              const isPrimary = key === preferred;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => openInNewTab(url)}
                  className={isPrimary ? primaryButtonClasses : secondaryButtonClasses}
                >
                  <Icon className="h-4 w-4" />
                  <span>{isPrimary ? `Launch in ${name} (recommended)` : `Open in ${name}`}</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              );
            })
          ) : (
            <div className="col-span-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-blue-700 dark:border-blue-800 dark:bg-transparent dark:text-blue-200">
              No online editor is configured for this assignment yet.
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-3 rounded-lg border border-blue-100 bg-white p-4 text-sm dark:border-blue-800 dark:bg-blue-950/40">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-blue-900 dark:text-blue-100">Assignment slug:</span>
            <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-900 dark:bg-blue-900/60 dark:text-blue-100">
              {workspace.assignmentSlug}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(workspace.assignmentSlug, 'slug')}
              className="inline-flex items-center gap-1 rounded border border-blue-200 px-2 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-700 dark:text-blue-100"
            >
              {copied === 'slug' ? <ClipboardCheck className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
              Copy
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-blue-900 dark:text-blue-100">Student handle:</span>
            <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-900 dark:bg-blue-900/60 dark:text-blue-100">
              {studentHandle}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(studentHandle, 'handle')}
              className="inline-flex items-center gap-1 rounded border border-blue-200 px-2 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-700 dark:text-blue-100"
            >
              {copied === 'handle' ? <ClipboardCheck className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
              Copy
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-blue-900 dark:text-blue-100">Suggested branch name:</span>
            <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-900 dark:bg-blue-900/60 dark:text-blue-100">
              {branchName}
            </span>
            <button
              type="button"
              onClick={() => handleCopy(branchName, 'branch')}
              className="inline-flex items-center gap-1 rounded border border-blue-200 px-2 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-700 dark:text-blue-100"
            >
              {copied === 'branch' ? <ClipboardCheck className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
              Copy
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-blue-100 bg-white p-4 text-sm leading-6 dark:border-blue-800 dark:bg-blue-950/40">
          <div className="mb-2 flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-100">
            <FileText className="h-4 w-4" />
            <span>Workspace checklist</span>
          </div>
          <ol className="ml-5 list-decimal space-y-1 text-blue-800 dark:text-blue-100/80">
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-sm text-blue-800 dark:text-blue-200">
          {workspace.repoUrl && (
            <div className="flex items-start gap-2">
              <Github className="mt-1 h-4 w-4" />
              <div>
                <span className="font-semibold">Template repository:</span>{' '}
                <a
                  className="underline decoration-dotted underline-offset-2 hover:text-blue-900 dark:hover:text-blue-100"
                  href={workspace.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {workspace.repoUrl}
                </a>
              </div>
            </div>
          )}
          {workspace.docsUrl && (
            <div className="flex items-start gap-2">
              <FileText className="mt-1 h-4 w-4" />
              <div>
                <span className="font-semibold">Assignment tasks:</span>{' '}
                <a
                  className="underline decoration-dotted underline-offset-2 hover:text-blue-900 dark:hover:text-blue-100"
                  href={workspace.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Review TASKS.md
                </a>
              </div>
            </div>
          )}
          {workspace.zipUrl && (
            <div className="flex items-start gap-2">
              <Layers className="mt-1 h-4 w-4" />
              <div>
                <span className="font-semibold">Offline fallback:</span>{' '}
                <a
                  className="underline decoration-dotted underline-offset-2 hover:text-blue-900 dark:hover:text-blue-100"
                  href={workspace.zipUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download the ZIP archive
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-700/60 dark:bg-amber-900/30 dark:text-amber-200">
        <AlertTriangle className="mt-0.5 h-4 w-4" />
        <div>
          <p className="font-semibold">Need a different editor?</p>
          <p>
            You can always clone the repository locally or upload the ZIP to your preferred IDE. Just remember to push your
            work to GitHub and open a pull request so the automated tests can report back to the LMS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLaunchPanel;
