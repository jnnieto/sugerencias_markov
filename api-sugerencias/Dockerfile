FROM python:latest
RUN pip3 install fastapi
RUN pip3 install uvicorn
RUN pip3 install pydantic
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]