# Development stage
FROM python:3.12-slim as development

WORKDIR /app

# Install poetry
RUN pip install poetry

# Copy poetry files
COPY pyproject.toml poetry.lock* README.md ./
# Copy lock file if it exists, otherwise it will be generated

# Configure poetry to not create a virtual environment
RUN poetry config virtualenvs.create false

# Install dependencies (and generate lock file if missing)
RUN if [ ! -f poetry.lock ]; then poetry lock; fi && poetry install --no-root

# Copy application code
COPY . .

# Production stage
FROM python:3.12-slim as production

WORKDIR /app

# Install poetry
RUN pip install poetry

# Copy poetry files
COPY pyproject.toml poetry.lock* README.md ./

# Configure poetry to not create a virtual environment
RUN poetry config virtualenvs.create false

# Install only production dependencies
RUN if [ ! -f poetry.lock ]; then poetry lock; fi && poetry install --no-dev

# Copy application code
COPY . .

CMD ["poetry", "run", "python", "src/run.py"] 
