# Ръководство за настройване на Jupyter тетрадки с TypeScript код

## Предварителни изисквания към средата

- Node.js (най-добре чрез nvm)
- Python 3.x, инсталиран на системата
- Jupyter (ще бъде инсталиран в venv)

## Стъпки за настройка

### 1. Създайте Python виртуална среда

Създайте изолирана Python среда, за да избегнете замърсяване на :

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

Заб: В случай на грешка в PowerShell, изпълнете:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

### 2. Инсталирайте Jupyter

След като задействате виртуалната среда изпълнете следните команди:

```bash
pip install --quiet jupyter notebook
```

### 3. Инсталирайте TypeScript Kernel

Инсталирайте Node.js пакетите глобално (ако все още не са инсталирани):

```bash
npm install -g tslab
```

Намерете точния път до tslab:

**macOS/Linux:**
```bash
npm list -g tslab
```

**Windows (PowerShell или Command Prompt):**
```powershell
npm list -g tslab
```

Ще видите резултат като:
```
/Users/username/.nvm/versions/node/v24.9.0/lib/node_modules/tslab
# или на Windows:
# C:\Users\username\AppData\Roaming\npm\node_modules\tslab
```

Регистрирайте TypeScript kernel с Jupyter:

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

Заменете `/path/to/tslab` или `C:\path\to\tslab` с действителния път от `npm list -g tslab` по-горе.

### 4. Проверете инсталацията на Kernel

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

Трябва да видите `tslab` в резултата:

```
Available kernels:
  tslab      /path/to/kernel/spec
  python3    /path/to/kernel/spec
  ...
```

### 5. Стартирайте Jupyter

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

Това отваря раздел в браузъра, през който можете да достигнете и до самите тетрадк.

**Портът вече е в употреба:**
Jupyter се използва по подразбиране на порт 8888. За да използвате различен порт:
```bash
jupyter notebook --port 8889
```

