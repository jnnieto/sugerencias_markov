FROM python:latest
COPY . .
RUN pip3 install fastapi
RUN pip3 install uvicorn
RUN pip3 install pydantic
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]