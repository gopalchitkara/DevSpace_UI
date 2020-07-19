import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar';
import Homepage from './components/homepage/Homepage';
import { AuthContextProvider } from './contexts/AuthContext';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import NewArticle from './components/articles/NewArticle';
import Article from './components/articles/Article';
import Search from './components/articles/Search';
import ReadingList from './components/readingList/ReadingList';
import MySettings from './components/userProfile/MySettings';
import UserProfile from './components/userProfile/UserProfile';
import Help_WriteNewPost from './components/webFront/Help_WriteNewPost'
import Topic from './components/topics/Topic';
import Notifications from './components/userProfile/Notifications';
import Drafts from './components/drafts/Drafts';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <AuthContextProvider>
                    <Topbar />
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <Route exact path='/signin' component={SignIn} />
                        <Route exact path='/signup' component={SignUp} />
                        {/* <Route exact path='/about' component={About} /> */}
                        <Route exact path='/help/writenewarticle' component={Help_WriteNewPost} />
                        <Route exact path="/newarticle" component={NewArticle} />
                        <Route exact path="/readinglist" component={ReadingList} />
                        <Route exact path="/user/:username" component={UserProfile} />
                        <Route exact path="/settings" component={MySettings} />
                        <Route exact path="/article/:articleId" component={Article} />
                        <Route exact path="/topic/:topicName" component={Topic} />
                        <Route exact path="/search/:searchedValue" component={Search} />
                        <Route exact path="/notifications" component={Notifications} />
                        <Route exact path="/drafts" component={Drafts} />
                    </Switch>
                </AuthContextProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
