# import python3.10 image
FROM python:3.10-slim-bullseye

# set the working directory
WORKDIR /app

# copy the requirements file
COPY setup.py .

# install dependencies
RUN pip install -e .


# copy the content of the local src directory to the working directory
COPY . .

# command to run on container start
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
