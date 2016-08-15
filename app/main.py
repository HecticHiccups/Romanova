
from clarifai.rest import ApiClient, Image
from flask import Flask, request, redirect, url_for, send_from_directory
from clarifai.client import ClarifaiApi
import json


app_id = "-Vi-qtSkO7YoquYqPUbjR-In9G74Y7TYoAyQsnA5"
app_secret = "VaVyBbyvmnpoyvOehbDjsnh284T7Nx751LkSVd5H"


## API Client
clarifai_api = ClarifaiApi()

####################################################################################################

## create our endpoint
print "Recieving access token:\n "
api = ApiClient(client_id=app_id, client_secret=app_secret)
######################################## sample images for debuggin  #################################
img1 = Image(url='https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx',
             labels=['cat'])
img2 = Image(url='http://static.independent.co.uk/s3fs-public/styles/article_large/public/thumbnails/image/2016/02/25/13/cat-getty_0.jpg',
             labels=['cat'])
img3 = Image(url='http://www.lafayettecountyhealth.org/ThreePeople.jpg')

######################################## images for a programmer ##################################### 
computer_img1 = Image(url='https://static.pexels.com/photos/6218/desk-laptop-notebook-table.jpg',
                     labels=['computer'])
computer_img2 = Image(url='http://www.encouragersoftware.com/wp-content/uploads/2015/10/laptop-size.jpeg',
                      labels=['computer'])

glasses_img  = Image(url='https://www.coastal.com/thelook/wp-uploads/2013/07/black-rim-glasses-main1.jpg',
                     labels=['glasses'])
coffee_img   = Image(url='http://www.seriouseats.com/images/2015/10/coffee-shutterstock_52699507.jpg',
                     labels=['coffee'])
######################################## images for a civilian #######################################

kids_img  = Image(url='http://images.parents.mdpcdn.com/sites/parents.com/files/styles/scale_1500_1500/public/crying-baby-closeup.jpg',
                 labels=['river'])
teens_img = Image(url='http://www.myrollercoaster.org.au/Portals/0//EasyDNNnews/64/6405_teenagers_r_w.jpg',
                  labels=['dribble'])
adults_img = Image(url='http://www.pasw4kids.com/image/100404645.jpg',
                   labels=['dribble'])
seniors_img = Image(url='http://theseniorzone.com/wp-content/uploads/2015/02/GroupofSeniors1.jpg',
                    labels=['dribble'])


                     
## Used to train our model
api.addInputs([computer_img1, computer_img2, glasses_img, coffee_img, kids_img, teens_img, adults_img, seniors_img])


#Debug: print "\nModel Data:\n "
res = api.createModel(model_name='civilian', concept_ids=['river', 'pool', 'dribble', 'computer'])
#Debug: print res

model_id = res['model']['id']


##Debug: print "\nModel Number: " +  model_id + "\n"


api.trainModel(model_id=model_id)

#######################################################################################################
## new images to test our new model with
civilian_url = 'http://wiinnebago.com/wp-content/uploads/2013/06/HR-People.jpg'
programmer_url = 'https://upload.wikimedia.org/wikipedia/commons/4/42/HackTX_2012_Student_programmers_working.jpg'

## load them into a Image object
civilian_img = Image(url=civilian_url)
programmer_img = Image(url=programmer_url)
 
## use API to predict
#tags = api.predictModel(model_id=model_id, objs=[civilian_img])

#Debug: print "Tags:"
#Debug: print json.dumps(tags, indent=4, sort_keys=True)

###################################################################################################################
## Recieve images to process
## Set up web server

app = Flask(__name__)

## Shannons get Routines
pool = ["you are waiting for your subway car ",
        "a small girl chasing her brother accidently shoves you on to the tracks ",
        "the car comes, running you over and results in an immediate fatality ",
        "your blood decorates the terminal walls "]

river = ["you have been snatched by a cannibal ",
         "she ties you up and flays you beginning with your neck and fingertips ",
         "she douses your flayed person in alcohol ",
         "you writhe in agony, and eventually die due to shock and infection "]

dribble = ["you are going on vacation ",
           "you go swimming in a river for leisure, and contract a parasite ",
           "you go to the hospital days later when you notice severe bodily changes ",
           "it is too late at this time ",
           "your body is now the breeding ground to parasites that will harvest your organs and muscles until you are no longer able to support yourself!"]

programmer = ["You're pretty cool!"]

# uses a tag to value dict; extracts largest value and returns the routine
# associated with the most accurate tag
# use decorators to link the function to a url
@app.route('/')
def home():
    return app.send_static_file('index.html')  # return a string

@app.route('/<path:path>')
def welcome(path):
    return app.send_static_file(path)
    
def get_routine(tags):

# Compare name of concepts value using max (n , max (n m))
# use max prob value concept name as x 
#    maxValue = lambda x:
    
    maximum = max(tags, key=tags.get)

    #Debug: print(maximum, tags[maximum])

    routine = {
        "river":river,
        "pool":pool,
        "dribble":dribble,
        "computer":programmer
        }
    
    return routine[maximum]

@app.route('/model')
def model():
    imgUrl = request.args.get('imgUrl')
    
    tags = api.predictModel(model_id=model_id, objs=[Image(url=imgUrl)])

    print json.dumps(tags, indent=4, sort_keys=True)
    value_dict = {}
    for tag in tags['outputs'][0]['data']['tags']:
        id = tag['concept']['id']
        value = tag['value']
        value_dict[id] = value

    routine = get_routine(value_dict)
    
   #Debug:  print "We are showing the value dict"
   #Debug:  print value_dict
   #Debug: routine = getRoutine(tags['tags']['id']
   #Debug: print json.dumps(tags , indent=4, sort_keys=True)
    
    return json.dumps(routine)


# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)
    

