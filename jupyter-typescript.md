# Jupyter TypeScript Setup Guide

This guide walks through setting up a TypeScript kernel for Jupyter notebooks in this repository.

## Prerequisites

- Node.js (via nvm) with npm
- Python 3.x available on system
- Jupyter (will be installed in venv)

## Setup Steps

### 1. Create Python Virtual Environment

Create an isolated Python environment to avoid system-wide package pollution:

**macOS/Linux (Bash):**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows (PowerShell):**
```powershell
python -m venv venv
venv\Scripts\Activate.ps1
```

If you get an execution policy error on PowerShell, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

### 2. Install Jupyter

With the venv activated:

```bash
pip install --quiet jupyter notebook
```

### 3. Install TypeScript Kernel

Install Node.js dependencies globally (if not already done):

```bash
npm install -g tslab
```

Find the exact path to tslab:

**macOS/Linux:**
```bash
npm list -g tslab
```

**Windows (PowerShell or Command Prompt):**
```powershell
npm list -g tslab
```

You'll see output like:
```
/Users/username/.nvm/versions/node/v24.9.0/lib/node_modules/tslab
# or on Windows:
# C:\Users\username\AppData\Roaming\npm\node_modules\tslab
```

Register the TypeScript kernel with Jupyter:

**macOS/Linux (Bash):**
```bash
source venv/bin/activate
python3 /path/to/tslab/python/install.py --user
```

**Windows (PowerShell):**
```powershell
venv\Scripts\Activate.ps1
python C:\path\to\tslab\python\install.py --user
```

Replace `/path/to/tslab` or `C:\path\to\tslab` with the actual path from `npm list -g tslab` above.

### 4. Verify Kernel Installation

**macOS/Linux (Bash):**
```bash
source venv/bin/activate
jupyter kernelspec list
```

**Windows (PowerShell):**
```powershell
venv\Scripts\Activate.ps1
jupyter kernelspec list
```

You should see `tslab` in the output:

```
Available kernels:
  tslab      /path/to/kernel/spec
  python3    /path/to/kernel/spec
  ...
```

### 5. Start Jupyter

**macOS/Linux (Bash):**
```bash
source venv/bin/activate
jupyter notebook
```

**Windows (PowerShell):**
```powershell
venv\Scripts\Activate.ps1
jupyter notebook
```

This opens a browser tab showing the notebook interface.
