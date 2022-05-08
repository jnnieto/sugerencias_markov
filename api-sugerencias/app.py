from webbrowser import get
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

origins = [
    "http://localhost:4200",
    "http://localhost:8082",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

lexicon = {}


def agregar_palabras(current: str, next_word: str) -> None:
    
    if current not in lexicon:
        lexicon.update({current: {next_word: 1}})
        return
    
    options = lexicon[current]

    if next_word not in options:
        options.update({next_word : 1})
    else:
        options.update({next_word : options[next_word] + 1})

    lexicon[current] = options

with open('texto.txt', encoding="utf-8") as dataset:
    for line in dataset:
        words = line.strip().split(' ')
        for i in range(len(words) - 1):
            agregar_palabras(words[i], words[i+1])

# Adjust propability
for word, transition in lexicon.items():
    transition = dict((key, value / sum(transition.values())) for key, value in transition.items())
    lexicon[word] = transition


def predict_word(word: str):
    if word not in lexicon:
        return 'Palabra no encontrada'
    else:
        options = lexicon[word]
        return np.random.choice(list(options.keys()), p=list(options.values()))


@app.get('/sugerir/')
def sugerir_palabra(word: str = ''):
    return predict_word(word)



