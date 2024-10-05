FROM python:3.9-alpine AS builder

RUN apk add --no-cache gcc musl-dev libffi-dev openssl-dev cargo make sqlite libstdc++ libgcc nodejs npm

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN pip install prisma
RUN prisma generate

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]