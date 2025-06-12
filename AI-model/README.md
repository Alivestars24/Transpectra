## 🛠️ Setup Instructions

### 📦 Prerequisites

- Python 3.12
- [uv](https://github.com/astral-sh/uv) package manager
- Google Chrome installed (locally)
- Docker (for containerized use)

---

### ⚙️ Local Setup using `uv`

```bash
# 1. Install uv (if not already installed)
pip install uv

# 3. Install dependencies
uv venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows

uv add tensorflow
uv sync

uv run task dev
```
