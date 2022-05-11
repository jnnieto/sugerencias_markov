from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class NewWord(BaseModel):
    word: str
    new_word: str

def agregar_palabras(current: str, next_word: str) -> None:
    characters_ignored = '.,;:¿?»«'

    for x in range(len(characters_ignored)):
        current = current.replace(characters_ignored[x], '')
        next_word = next_word.replace(characters_ignored[x], '')

    if current not in lexicon:
        lexicon.update({current: {next_word: 1}})
        return
    
    options = lexicon[current]

    if next_word not in options:
        options.update({next_word : 1})
    else:
        options.update({next_word : options[next_word] + 1})

    lexicon[current] = options

def adjust_probabilities():
    for word, transition in lexicon.items():
        transition = dict((key, value / sum(transition.values())) for key, value in transition.items())
        lexicon[word] = transition


with open('texto.txt', encoding="utf-8") as dataset:
    for line in dataset:
        words = line.strip().split(' ')
        for i in range(len(words) - 1):
            agregar_palabras(words[i].lower(), words[i+1].lower())
    adjust_probabilities()


def predict_word(word: str):
    if word not in lexicon:
        return
    else:
        options = lexicon[word]
        sorted_keys = sorted(options, key=options.get)
        sorted_options = {}

        for w in sorted_keys:
            sorted_options[w] = options[w]

        return list(sorted_options.keys());

@app.get('/sugerir/')
def sugerir_palabra(word: str = ''):
    palabras = predict_word(word.lower())
    return palabras


@app.post('/agregar/')
def agregar_palabras(newWord: NewWord):
    agregar_palabras(newWord.word.lower(), newWord.new_word.lower())
    palabras = predict_word(newWord.word.lower())
    adjust_probabilities()
    return palabras
