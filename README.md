## Romanova (General Assembly Hackathon)
A 12 hour hackathon in teams of four. We were given the theme of Machines vs Humanity
where we develop applications that help bring the apocolopyse of Artificially Intelligent Robots.
Romanova is an AI-based web app that when given a picture selects humans to kill
, but if the humans are programmers they get to live.

![](app/static/images/Romanova.png)
## Code Example
Using the Clarifai API we were able to manipulate the JSON file, by using the tags
to distinguish what kind of model an image is based on the models we've already trained.

```python
@app.route('/model')
def model():
    imgUrl = request.args.get('imgUrl')

    tags = api.predictModel(model_id=model_id, objs=[Image(url=imgUrl)])

    value_dict = {}
    for tag in tags['outputs'][0]['data']['tags']:
        id = tag['concept']['id']
        value = tag['value']
        value_dict[id] = value

    routine = get_routine(value_dict)

    return json.dumps(routine)
```
Here's a more in depth guide:
[Quickstart](http://flask.pocoo.org/docs/0.11/quickstart/) <br/>
Web Developer Guide: 
[Web Guide](http://blog.clarifai.com/a-copy-and-paste-guide-to-your-first-api-project-with-clarifai/#.V7Ifvo7TWYX)</br>
## Installation and Testing

```shell
git clone https://github.com/HecticHiccups/Romanova
cd ~/Romanova/app
python main.py
```
This should get your Romanova web app up on your localhost, you can test out the functionality by uploading your custom photos from the localhost. To see generated values
open up developer tools for your browser and view objects from console. The output would be an array of Strings to be displayed on screen with uploaded picture in background.

## Clarifai API
We use the Clarifai API that handles image and video recognition; uses underlying machine learning mechanics made easily accessible. First we would load the images:
```python
img1 = Image(url='im_url_here',
             labels=['custom_label_here'])
```
add the images into the api

```python
api.addInputs([img1])
```
create a model and train it, where the tags are our classifiers

```python
res = api.createModel(model_name='civilian', concept_ids=['river', 'pool', 'dribble'])
```

Take a look at the [Clarifai API](https://developer.clarifai.com/guide/)
## Our Technologies Stack
Flask <br/>
Python <br/>
JavaScript <br/>
JQuery <br/>

## Team
**Backend** : Jonathan Portorreal <br />
**Backend** : Shannon C. O'Connor <br />
**Frontend** : Anthony Beltran <br />
**Fullstack** : Jesus Arteaga
