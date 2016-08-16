module StoryLine where

type Start = String
type Connector = String

data Story = Start | Connector deriving (Show)
data Plot = Story | End deriving (Show)

generatePlots :: FilePath -> [Plot]
generatePlots = undefined

createStory :: Story -> Plot
createStory = undefined

selectPlot :: [Plot] -> Plot
selectPlot = undefined

sendToServer :: IO ()
sendToServer = undefined

main :: IO ()
main = do
  putStrLn "Creating Stories..."
  
