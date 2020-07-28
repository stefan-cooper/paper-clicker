
## Using Git

Git Workflow

### Cloning the repository

Before this, ensure your ssh key and github account is all appropiately set up with your machine.

1. Using terminal, navigate to an appropiate directory and do `git clone git@github.com:3eak/paper-clicker.git` This will clone the remote repository to your machine
2. You now have the repository on your machine, I will list process of going from nothing to submitting a pull request

### Getting started with working on the repo

In our repo, we disallow pushing directly to master so we will always need to work in a different branch to get work done.

1. In the repo directory do `git checkout -b enterYourBranchNameHere`
2. It's not super important what your branch name is but having something which makes it clear what feature you're working on is generally good practise
3. It's good practise to work on small features and slowly integrate them into master, rather than working on a huge implementation that doesn't quite merge nicely
4. Once you're in your branch you can start working on whatever you're working on, you can save freely without worrying about breaking master

### Committing and saving your changes

Once you work on your features, once again it is generally good practise to make lots of small commits as you go, so you have an easily traceable path in case you break something and want to know how it happened.

1. Once you're finished working on your feature, head to your repo dir do `git status`
2. You should now see your changed/new files in red, you should check your changed files with `git diff fileName`
3. Once you're happy with the files changes and you want to commit them, do `git add fileName` on each file individually (there are ways of adding all files at once which you can look up online, but it's better to indivudually `diff` each one and add them like that personally)
4. Once you've added all the files you plan on adding, do `git commit -m 'Enter your commit message here'`
5. It's not too important what your commit message is, but it is generally quite good to have a recognizable message so you can trace what you worked on in that commit

### Saving your changes remotely and PUSHING

You can commit many times before having them saved online. The way we save online is done via `push` to the remote repo.

1. Once you're happy with the work you've done, or if you want to show your work to me remotely; you will need to push your work online to GitHub. You can do this by navigating to the repo dir and doing `git push`
2. The first time you do this in a branch it will prompt you with a specific command that you can copy paste in, once you've done it once it will work from a simple `git push`
3. Your work should now be pushed and viewable as a new branch on GitHub

### Getting your work merged into master

As mentioned before, we can't push directly to master so we will need to create a pull request to merge all work finished by yourself.

1. To create a pull request, navigate on GitHubs web page to your branch and click `New Pull Request`
2. From there you have a pretty self-explanatory UI to create your pull request, enter a descriptive title and a short description of the changes made.
3. Once you've added it, stick it in the pull-requests channel on our discord and @ me so I can easily see the changes made. I will do the same for my changes. 

### Reviewing code

It is important that all code goes into the master is clean and isn't going to break anything. So it is important we ask questions and push on why we are doing things in specific ways and offer suggestions on how to improve the code.

1. Open the pull request assigned to you in GitHub
2. Read the description and title thoroughly and have a read through the changes made in the files
3. Once you've decided whether you're satisfied/unsatisfied with the code changes, submit your review and then @ me again to tell me what you said


## And that's it! 

For the most part, that's git in a nutshell. There will be times you might need to look online how something works but you should be able to get most stuff from the post written above. 

# Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
