## Romanova (General Assembly Hackathon)
A 12 hour hackathon in teams of four. We were given the theme of Machines vs Humanity where we develop applications that help bring the apocolopyse of Artificially Intelligent Robots.
Romanova is an AI-based web app that when given a picture selects humans to kill, but if the humans are programmers they get to live.

## Code Example

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Installation and Testing


```<shell>
git clone https://github.com/HecticHiccups/Romanova
export=FLASK_APP=main.py
flask run main.py
```
this should get your Romanova web app up on your localhost, you can test out the functionality by uploading your custom photos

## Clarifai API
We use the Clarifai API that handles image and video recognition; uses underlying machine learning mechanics made easily accessible. First we would load the images:
```<python>
img1 = Image(url='im_url_here',
             labels=['custom_label_here'])
```

add the images into the api

```<python>
api.addInputs([img1])
```

create a model and train it, where the tags are our classifiers

```<python>
res = api.createModel(model_name='civilian', concept_ids=['river', 'pool', 'dribble'])
```
