from webbrowser import get
from fastapi import FastAPI
import numpy as np

app = FastAPI()

lexicon = {}


def update_lexicon(current: str, next_word: str) -> None:
    
    if current not in lexicon:
        lexicon.update({current: {next_word: 1}})
        return
    
    options = lexicon[current]

    if next_word not in options:
        options.update({next_word : 1})
    else:
        options.update({next_word : options[next_word] + 1})

    lexicon[current] = options

with open('texto.txt', 'r') as dataset:
    for line in dataset:
        words = line.strip().split(' ')
        for i in range(len(words) - 1):
            update_lexicon(words[i], words[i+1])




