import React, { useState, useEffect, useRef } from 'react';

// Define VFS interfaces
interface VFSFile {
  type: 'file';
  content: string;
}

interface VFSDirectory {
  type: 'dir';
  children: { [name: string]: VFSNode };
}

type VFSNode = VFSFile | VFSDirectory;

// Initial Virtual File System (VFS)
const VFS: VFSDirectory = {
  type: 'dir',
  children: {
    'about.txt': {
      type: 'file',
      content: "Hi, I'm Shashwat Shikhar Dwivedi, a CSE student specializing in systems programming and quantitative finance analysis."
    },
    'skills': {
      type: 'dir',
      children: {
        'languages.txt': {
          type: 'file',
          content: "C, C++, Java, Python (NumPy, Pandas, Scikit-Learn), \nJavaScript, TypeScript, SQL"
        },
        'tools.txt': {
          type: 'file',
          content: "React.js, Node.js, Express.js, PostgreSQL, TailwindCSS, \nStreamlit, Git, GitHub, Postman, Linux"
        },
        'quant_finance.txt': {
          type: 'file',
          content: "Finance Modelling, Stochastic Modelling, Derivatives Pricing (Greeks, Monte Carlo),\nTime Series (ARIMA, GARCH), VaR, CVaR, Sharpe Ratio, \nPortfolio Construction & Optimisation, ESG Metrics, Equity Valuation"
        },
        'data_ai.txt': {
          type: 'file',
          content: "Data Analytics, Data Engineering, Blockchain Technology,\nGenerative AI, Prompt Engineering, Agentic Development"
        }
      }
    },
    'projects': {
      type: 'dir',
      children: {
        'MF_Portfolio_Pro.md': {
          type: 'file',
          content: "A quantitative finance tool focusing on Mutual Fund analysis, Sharpe Ratio optimization, and LSTM-based forecasting."
        },
        'TravelBuddy.md': {
          type: 'file',
          content: "A university-specific micro-mobility and ride-sharing ecosystem designed for campus commuting."
        },
        'portfolio.md': {
          type: 'file',
          content: "My personal retro-themed portfolio website featuring a simulated Bash terminal and virtual file system."
        }
      }
    }
  }
};

interface TerminalProps {
  onClose: () => void;
}

interface HistoryItem {
  id: string;
  type: 'input' | 'output' | 'error';
  text: string;
  dir?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [cwd, setCwd] = useState<string[]>(['~']);
  const [commandHistory, setCommandHistory] = useState<HistoryItem[]>([
    {
      id: 'welcome-1',
      type: 'output',
      text: "System initialized.\nShashwat Shikhar Dwivedi.\nType \"help\" for a list of available commands."
    }
  ]);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [inputValue, setInputValue] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when clicking anywhere inside the terminal
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Keep input focused automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom of command history
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // VFS Path Resolution Helper
  const resolvePath = (pathStr: string): { node: VFSNode | null; newCwd: string[] | null; error: string | null } => {
    if (!pathStr) return { node: null, newCwd: null, error: 'Path not specified' };

    let segments: string[] = [];
    let startFromRoot = false;

    if (pathStr === '~') {
      return { node: VFS, newCwd: ['~'], error: null };
    }

    if (pathStr.startsWith('~/')) {
      startFromRoot = true;
      segments = pathStr.slice(2).split('/').filter(Boolean);
    } else if (pathStr.startsWith('~')) {
      // E.g., cd ~projects or similar (fallback behavior)
      startFromRoot = true;
      segments = pathStr.slice(1).split('/').filter(Boolean);
    } else {
      segments = pathStr.split('/').filter(Boolean);
    }

    let tempCwd = startFromRoot ? ['~'] : [...cwd];
    let currentNode: VFSNode = VFS;

    // Traverse to start point (CWD) if not starting from root
    if (!startFromRoot) {
      for (let i = 1; i < tempCwd.length; i++) {
        if (currentNode.type === 'dir' && currentNode.children[tempCwd[i]]) {
          currentNode = currentNode.children[tempCwd[i]];
        } else {
          return { node: null, newCwd: null, error: 'Invalid current working directory' };
        }
      }
    }

    // Resolve segments
    for (const segment of segments) {
      if (segment === '.') {
        continue;
      }
      if (segment === '..') {
        if (tempCwd.length > 1) {
          tempCwd.pop();
          // Reset currentNode to the resolved popped path
          currentNode = VFS;
          for (let i = 1; i < tempCwd.length; i++) {
            if (currentNode.type === 'dir' && currentNode.children[tempCwd[i]]) {
              currentNode = currentNode.children[tempCwd[i]];
            }
          }
        }
        continue;
      }

      if (currentNode.type !== 'dir') {
        return { node: null, newCwd: null, error: 'Not a directory' };
      }

      const nextNode = currentNode.children[segment];
      if (!nextNode) {
        return { node: null, newCwd: null, error: `No such file or directory: ${segment}` };
      }

      currentNode = nextNode;
      if (currentNode.type === 'dir') {
        tempCwd.push(segment);
      }
    }

    return { node: currentNode, newCwd: tempCwd, error: null };
  };

  // Longest Common Prefix Helper
  const getLongestCommonPrefix = (arr: string[]): string => {
    if (!arr || arr.length === 0) return '';
    let prefix = arr[0];
    for (let i = 1; i < arr.length; i++) {
      while (arr[i].indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (prefix === '') return '';
      }
    }
    return prefix;
  };

  // Autocomplete logic for Tab key press
  const handleAutocomplete = () => {
    const commandsList = ['help', 'pwd', 'ls', 'cd', 'cat', 'echo', 'clear', 'exit', 'sudo'];
    const input = inputValue;
    const trimmed = input.trimStart();

    // Check if we are completing the command itself (no spaces typed yet)
    const spaceIndex = trimmed.indexOf(' ');
    if (spaceIndex === -1) {
      const prefix = trimmed.toLowerCase();
      const matches = commandsList.filter(c => c.startsWith(prefix));

      if (matches.length === 0) return;

      if (matches.length === 1) {
        // Complete immediately with a space
        const leadingSpaces = input.length - trimmed.length;
        setInputValue(' '.repeat(leadingSpaces) + matches[0] + ' ');
      } else {
        // Multiple matches
        const lcp = getLongestCommonPrefix(matches);
        const leadingSpaces = input.length - trimmed.length;
        if (lcp.length > prefix.length) {
          setInputValue(' '.repeat(leadingSpaces) + lcp);
        } else {
          // List choices
          setCommandHistory(prev => [
            ...prev,
            {
              id: `autocomplete-input-${Date.now()}`,
              type: 'input',
              text: input,
              dir: cwd.join('/')
            },
            {
              id: `autocomplete-output-${Date.now()}`,
              type: 'output',
              text: matches.join('    ')
            }
          ]);
        }
      }
    } else {
      // Argument mode (completing file/directory paths)
      const cmdPart = trimmed.substring(0, spaceIndex).toLowerCase();
      const argPart = trimmed.substring(spaceIndex + 1);

      // We complete the last path segment in the argument
      const segments = argPart.split('/');
      const prefix = segments[segments.length - 1];
      const pathBeforeLastSegment = segments.slice(0, -1).join('/');

      let searchDirNode: VFSNode = VFS;

      if (pathBeforeLastSegment) {
        const { node, error } = resolvePath(pathBeforeLastSegment);
        if (error || !node || node.type !== 'dir') return;
        searchDirNode = node;
      } else {
        searchDirNode = getCurrentNode();
      }

      if (searchDirNode.type !== 'dir') return;

      const allCandidates = Object.keys(searchDirNode.children);
      
      // If cd command, only allow directory matches
      const matches = allCandidates.filter(name => {
        const child = (searchDirNode as VFSDirectory).children[name];
        if (cmdPart === 'cd' && child.type !== 'dir') return false;
        return name.startsWith(prefix);
      });

      if (matches.length === 0) return;

      if (matches.length === 1) {
        const matchedName = matches[0];
        const child = searchDirNode.children[matchedName];
        
        const resolvedArg = pathBeforeLastSegment
          ? pathBeforeLastSegment + '/' + matchedName
          : matchedName;

        const suffix = child.type === 'dir' ? '/' : ' ';
        const leadingSpaces = input.length - trimmed.length;
        setInputValue(' '.repeat(leadingSpaces) + cmdPart + ' ' + resolvedArg + suffix);
      } else {
        // Multiple matches
        const lcp = getLongestCommonPrefix(matches);
        const leadingSpaces = input.length - trimmed.length;

        if (lcp.length > prefix.length) {
          const resolvedArg = pathBeforeLastSegment
            ? pathBeforeLastSegment + '/' + lcp
            : lcp;
          setInputValue(' '.repeat(leadingSpaces) + cmdPart + ' ' + resolvedArg);
        } else {
          // List options
          const formattedMatches = matches.map(m => {
            const child = (searchDirNode as VFSDirectory).children[m];
            return child.type === 'dir' ? `${m}/` : m;
          });

          setCommandHistory(prev => [
            ...prev,
            {
              id: `autocomplete-input-${Date.now()}`,
              type: 'input',
              text: input,
              dir: cwd.join('/')
            },
            {
              id: `autocomplete-output-${Date.now()}`,
              type: 'output',
              text: formattedMatches.join('    ')
            }
          ]);
        }
      }
    }
  };

  // Get current directory VFS Node
  const getCurrentNode = (): VFSDirectory => {
    let currentNode: VFSNode = VFS;
    for (let i = 1; i < cwd.length; i++) {
      if (currentNode.type === 'dir' && currentNode.children[cwd[i]]) {
        currentNode = currentNode.children[cwd[i]];
      }
    }
    return currentNode as VFSDirectory;
  };

  // Command Execution Handler
  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) {
      // Just print a blank prompt line
      setCommandHistory(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'input',
          text: '',
          dir: cwd.join('/')
        }
      ]);
      return;
    }

    // Add to input history
    setInputHistory(prev => {
      const updated = [...prev, trimmed];
      setHistoryIndex(updated.length);
      return updated;
    });

    // Parse command and arguments
    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const argStr = args.join(' ');

    const newItems: HistoryItem[] = [
      {
        id: `input-${Date.now()}`,
        type: 'input',
        text: trimmed,
        dir: cwd.join('/')
      }
    ];

    let outputText = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        outputText = [
          'Available commands:',
          '  help             Display this help message',
          '  pwd              Print current working directory',
          '  ls               List files and directories in current folder',
          '  cd <dir>         Change directory (supports "..", "~", and relative paths)',
          '  cat <file>       Display text file contents',
          '  echo <text>      Print text to terminal output',
          '  clear            Clear terminal history screen',
          '  exit             Close the terminal window',
          '  sudo <cmd>       Execute command as superuser'
        ].join('\n');
        break;

      case 'pwd':
        outputText = cwd.join('/');
        break;

      case 'ls': {
        const node = getCurrentNode();
        const keys = Object.keys(node.children);
        if (keys.length === 0) {
          outputText = '';
        } else {
          outputText = keys
            .map(k => {
              const child = node.children[k];
              return child.type === 'dir' ? `${k}/` : k;
            })
            .join('    ');
        }
        break;
      }

      case 'cd': {
        const targetPath = argStr.trim();
        if (!targetPath) {
          // default cd acts like cd ~
          setCwd(['~']);
        } else {
          const { node, newCwd, error } = resolvePath(targetPath);
          if (error) {
            outputText = `cd: ${error}`;
            isError = true;
          } else if (node && node.type !== 'dir') {
            outputText = `cd: not a directory: ${targetPath}`;
            isError = true;
          } else if (newCwd) {
            setCwd(newCwd);
          }
        }
        break;
      }

      case 'cat': {
        const targetFile = argStr.trim();
        if (!targetFile) {
          outputText = 'cat: missing filename';
          isError = true;
        } else {
          const { node, error } = resolvePath(targetFile);
          if (error) {
            outputText = `cat: ${targetFile}: No such file or directory`;
            isError = true;
          } else if (node && node.type === 'dir') {
            outputText = `cat: ${targetFile}: Is a directory`;
            isError = true;
          } else if (node && node.type === 'file') {
            outputText = node.content;
          }
        }
        break;
      }

      case 'clear':
        setCommandHistory([]);
        setInputValue('');
        return;

      case 'echo':
        outputText = argStr;
        break;

      case 'sudo': {
        const subCmd = args.join(' ').toLowerCase();
        if (subCmd === 'hire shashwat') {
          outputText = 'Access Granted 🎉';
          window.dispatchEvent(new Event('trigger-confetti'));
        } else if (!subCmd) {
          outputText = 'usage: sudo <command>';
          isError = true;
        } else {
          outputText = 'sudo: permission denied';
          isError = true;
        }
        break;
      }

      case 'exit':
        onClose();
        return;

      default:
        outputText = `bash: ${cmd}: command not found`;
        isError = true;
        break;
    }

    if (outputText) {
      newItems.push({
        id: `output-${Date.now()}`,
        type: isError ? 'error' : 'output',
        text: outputText
      });
    }

    setCommandHistory(prev => [...prev, ...newItems]);
    setInputValue('');
  };

  // Keyboard Event Handlers (Enter, Up/Down arrow cycling)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocomplete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (inputHistory.length === 0) return;
      
      const nextIndex = Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(inputHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (inputHistory.length === 0) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= inputHistory.length) {
        setHistoryIndex(inputHistory.length);
        setInputValue('');
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(inputHistory[nextIndex]);
      }
    }
  };

  const currentCwdDisplay = cwd.join('/');

  return (
    <div
      onClick={handleContainerClick}
      className="w-full h-full bg-black/90 text-green-400 font-mono text-xs p-3 overflow-hidden flex flex-col cursor-text select-text"
      style={{
        fontFamily: "'Courier New', Courier, monospace"
      }}
    >
      {/* Scrollable Command Output History Area */}
      <div 
        ref={containerRef}
        className="flex-grow overflow-y-auto no-scrollbar space-y-1.5 whitespace-pre-wrap pr-1"
      >
        {commandHistory.map((item) => {
          if (item.type === 'input') {
            return (
              <div key={item.id} className="flex flex-row items-center">
                <span className="text-zinc-400 select-none mr-2">
                  shashwat:{item.dir}$
                </span>
                <span className="text-zinc-100">{item.text}</span>
              </div>
            );
          } else {
            return (
              <div
                key={item.id}
                className={item.type === 'error' ? 'text-red-400 font-semibold' : 'text-green-400/90'}
              >
                {item.text}
              </div>
            );
          }
        })}

        {/* Active Input Line */}
        <div className="flex flex-row items-center w-full">
          <span className="text-zinc-400 select-none mr-2 shrink-0">
            shashwat:{currentCwdDisplay}$
          </span>
          <div className="flex-grow flex items-center relative min-w-0">
            <span className="text-zinc-100 break-all">{inputValue}</span>
            <span className="w-1.5 h-3 bg-green-400 cursor-blink ml-0.5 inline-block shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 opacity-0 w-full cursor-text border-none outline-none"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
